import { IRabbitmqAdapter } from './interface/adapter.interface'
import {
    from,
    Observable,
    of,
} from 'rxjs'
import { IConfig } from '../../common/interface/config.interface'
import * as Amqp from 'amqplib'
import {
    concatMap,
    delay,
    map,
    retryWhen,
    tap,
} from 'rxjs/operators'
import { IMessageLog } from './interface/schema.interface'
import * as Moment from 'moment'
import { OnApplicationShutdown } from '@nestjs/common'

export class RabbitmqAdapter implements IRabbitmqAdapter, OnApplicationShutdown {
    private readonly _connectionString: string
    private readonly _offlineBuffers: IMessageLog[]
    private _connection: Amqp.Connection
    private _channel: Amqp.ConfirmChannel

    constructor(
        private readonly _config: IConfig,
    ) {
        const connection1 = `${this._config.amqp.server}://${this._config.amqp.username}:`
        const connection2 = `${this._config.amqp.password}@${this._config.amqp.host}:${this._config.amqp.port}`
        this._connectionString = connection1 + connection2
        this._offlineBuffers = []

        this._createConnection()
        this._createChannel()

    }

    private static _timestamp() {
        return Moment().format('YYYY-MM-DD HH:mm:ss')
    }

    private _createConnection(): Promise<any> {
        return Amqp.connect(this._connectionString).then(connection => {

            this._connection = connection

            connection.on('close', () => {
                console.log(`[${RabbitmqAdapter._timestamp()}][AMQP] Connection close, retry connect`)
                setTimeout(() => {
                    this._createConnection()
                }, 1000)
            })

            connection.on('error', (err) => {
                console.error(`[${RabbitmqAdapter._timestamp()}][AMQP] Connection error`, err.message)
            })

            console.log(`[${RabbitmqAdapter._timestamp()}][AMQP] Connection created`)
            return connection
        }).catch(err => {
            console.error(`[${RabbitmqAdapter._timestamp()}][AMQP] Connection Error, retrying`, err.message)
            setTimeout(() => {
                this._createConnection()
            }, 1000)

        })
    }

    private _createChannel(): void {
        of({}).pipe(
            concatMap(() => {
                console.info(`[${RabbitmqAdapter._timestamp()}][AMQP] Creating queue channel`)
                return from(this._connection.createConfirmChannel())
            }),
            map((channel: Amqp.ConfirmChannel) => {
                channel.on('close', () => {
                    console.log(`[${RabbitmqAdapter._timestamp()}][AMQP] channel closed, create new channel`)
                    setTimeout(() => {
                        this._createChannel()
                    }, 500)
                })

                return channel
            }),
            tap((channel: Amqp.ConfirmChannel) => {
                console.log(`[${RabbitmqAdapter._timestamp()}][AMQP] consuming offline messages, total ${this._offlineBuffers.length} messages`)
                this._channel = channel
                while (true) {
                    const data = this._offlineBuffers.shift()
                    if (!data) {
                        break
                    }
                    this._publish(data)
                }
            }),

            retryWhen(errors => errors.pipe(
                tap(() => {
                    console.warn(`[${RabbitmqAdapter._timestamp()}][AMQP] Cannot create channel, retrying...`)
                }),
                delay(2000),
            )),
        ).subscribe()
    }

    public sendToRabbitmq(messageLog: IMessageLog): Observable<any> {
        return of(messageLog).pipe(
            map(message => {
                console.log(`[${RabbitmqAdapter._timestamp()}][AMQP] send messages to rabbitmq`)
                this._publish(message)
                return {success: true}
            }),
        )
    }

    private _publish(message: IMessageLog): void {
        try {
            this._channel.sendToQueue(
                message.queue,
                Buffer.from(message.messageLog),
                {persistent: true},
                err => {
                    if (err) {
                        console.error(`[${RabbitmqAdapter._timestamp()}][AMQP] publish error`, err.message)
                        this._offlineBuffers.push(message)
                        this._channel.close()
                    }
                },
            )

        } catch (e) {
            console.error(`[${RabbitmqAdapter._timestamp()}][AMQP] publish failed, store offline queue: ${this._offlineBuffers.length}`)
            this._offlineBuffers.push(message)
        }

    }

    public onApplicationShutdown(signal?: string): any {
        this._connection.removeAllListeners()
        return this._connection.close()
    }

}
