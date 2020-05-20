enum CommonProviderName {
    CONFIG = 'common-config-provider',
    RABBITMQ = 'rabbitmq-provider',
}

enum GatewayLogProviderName {
    RABBITMQ_ADAPTER = 'RABBITMQ-adapter-provider',
    GATEWAY_LOG_SERVICE = 'gateway-log-service-provider'
}

export const providerNames = Object.assign({},
    CommonProviderName,
    GatewayLogProviderName,
)
