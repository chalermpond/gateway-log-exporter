import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import * as Config from 'config'
import { IConfig } from '../common/interface/config.interface'
import { providerNames } from './provider.name'
import * as _ from 'lodash'

export const commonProviders: Provider[] = [
    {
        provide: providerNames.CONFIG,
        useFactory: (): IConfig => {
            const configApp = Config.util.toObject()
            if (!_.isEmpty(process.env.AMQP_HOST)) {
                configApp.amqp.host = process.env.AMQP_HOST
            }
            if (!_.isEmpty(process.env.AMQP_PORT)) {
                configApp.amqp.port = process.env.AMQP_PORT
            }

            if(!_.isEmpty(process.env.NODE_PORT)) {
                configApp.application.port = process.env.NODE_PORT
            }

            if(!_.isEmpty(process.env.AMQP_USERNAME)) {
                configApp.amqp.username = process.env.AMQP_USERNAME
            }

            if(!_.isEmpty(process.env.AMQP_PASSWORD)) {
                configApp.amqp.password = process.env.AMQP_PASSWORD
            }
            return configApp
        }
    },
]
