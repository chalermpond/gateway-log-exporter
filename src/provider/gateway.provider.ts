import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import { GatewayLogService } from '../domain/gateway-log/gateway-log.service'
import { IRabbitmqAdapter } from '../adapter/rabbitmq/interface/adapter.interface'
import { IConfig } from '../common/interface/config.interface'
import { RabbitmqAdapter } from '../adapter/rabbitmq/rabbitmq.adapter'

export const gatewayLogServiceProviders: Provider = {
    provide: providerNames.GATEWAY_LOG_SERVICE,
    inject: [
        providerNames.RABBITMQ_ADAPTER,
        // ...
    ],
    useFactory: (
        rabbitmqAdapter: IRabbitmqAdapter,
        // ...
    ) => {
        return new GatewayLogService(
            rabbitmqAdapter,
            // ...
        )
    }
}

export const rabbitmqAdapterProviders: Provider = {
    provide: providerNames.RABBITMQ_ADAPTER,
    inject: [
        providerNames.CONFIG,
    ],
    useFactory: (
        config: IConfig
    ) => {
        return new RabbitmqAdapter(
            config,
        )
    }
}
