import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import * as Config from 'config'
import { IConfig } from '../common/interface/config.interface'
import { providerNames } from './provider.name'
import * as amqp from 'amqplib/callback_api'
import * as _ from 'lodash'

export const commonProviders: Provider[] = [
    {
        provide: providerNames.CONFIG,
        useFactory: (): IConfig => {
            const configApp = Config.util.toObject()
            // process.env.AMQP_HOST
            if (!_.isEmpty(process.env.AMQP_HOST)) {
                configApp.amqp.host = process.env.AMQP_HOST
            }
            if (!_.isEmpty(process.env.AMQP_PORT)) {
                configApp.amqp.port = process.env.AMQP_PORT
            }
            console.log(`AMQP started on ${configApp.amqp.host}:${configApp.amqp.port}`)
            return configApp
        }
        // Config.util.toObject(),
    },
]

// export const rabbitmq: Provider = {
//     provide: providerNames.RABBITMQ,
//     useFactory: () => {
//         return amqp.connect('amqp://guest:guest@localhost:5672', (error0, connection) => {
//             if (error0) {
//                 console.log('error connect')
//                 throw error0
//             }
//             connection.createChannel((error1, channel) => {
//                 if (error1) {
//                     console.log('error create chanel')
//                     throw error1
//                 }
//
//                 const queue = 'hello'
//                 const msg = 'Hello world'
//
//                 channel.assertQueue(queue, {
//                     durable: false
//                 })
//
//                 channel.sendToQueue(queue, Buffer.from(msg))
//                 console.log(" [x] Sent %s", msg)
//             })
//         })
//     }
// }
