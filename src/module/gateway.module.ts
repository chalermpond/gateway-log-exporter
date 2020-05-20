import {
    Module,
} from '@nestjs/common'
import {
    gatewayLogServiceProviders,
    rabbitmqAdapterProviders,
} from '../provider/gateway.provider'
import { GatewayLogController } from '../controller/gateway-log/gateway-log.controller'

@Module({
    providers: [
        gatewayLogServiceProviders,
        rabbitmqAdapterProviders,
    ],
    controllers: [
        GatewayLogController,
    ]
})
export class GatewayModule {

}
