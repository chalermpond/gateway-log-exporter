import { IRabbitmqAdapter } from './interface/adapter.interface'
import {
    from,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { IConfig } from '../../common/interface/config.interface'
import * as amqp from 'amqplib/callback_api'
import {
    catchError,
    concatMap,
    map,
    tap,
} from 'rxjs/operators'
import * as _ from 'lodash'
import {
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { IMessageLog } from './interface/schema.interface'

export class RabbitmqAdapter implements IRabbitmqAdapter {
    private readonly _rabbitConnect: string

    constructor(
        private readonly _config: IConfig,
    ) {
        const connection1 = `${this._config.amqp.server}://${this._config.amqp.username}:`
        const connection2 = `${this._config.amqp.password}@${this._config.amqp.host}:${this._config.amqp.port}`
        this._rabbitConnect = connection1 + connection2
    }

    public sendToRabbitmq(messageLog: IMessageLog): Observable<any> {
        console.log(this._rabbitConnect)
        return of(messageLog).pipe(
            concatMap((data: IMessageLog) => {
                return of(amqp.connect(this._rabbitConnect, (error0, connection) => {
                        if (error0) {
                            console.log('error connect')
                            throw error0
                        }
                        connection.createChannel((error1, channel) => {
                            if (error1) {
                                console.log('error create chanel')
                                throw error1
                            }

                            channel.assertQueue(data.queue, {
                                durable: false,
                            })

                            channel.sendToQueue(data.queue, Buffer.from(data.messageLog))
                            console.log(' [x] Send queue:', data.queue)
                            console.log(' [x] Send message:', data.messageLog)
                        })
                    }),
                )
            }),
            concatMap(e => {
                // console.log(e)
                return of(200)
            }),
        )
    }
}