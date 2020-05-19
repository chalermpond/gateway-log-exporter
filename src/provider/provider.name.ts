enum CommonProviderName {
    CONFIG = 'common-config-provider',
    MONGO_CONNECTION = 'mongo-connection-provider',
    PROVINCE_REPOSITORY = 'province-repository-provider',
    PROVINCE_REPOSITORY_MAPPING = 'province-repository-mapping',
    PROVINCE_SERVICE = 'province-service-provider',
    GEO_PROVINCE_REPOSITORY = 'geo-repository-provider',
    GEO_PROVINCE_REPOSITORY_MAPPING = 'geo-province-repository-mapping',
    GEO_PROVINCE_SERVICE = 'geo-province-service-provider',
    AUTH_SERVICE = 'auth-service-provider',
    LOGGER_SERVICE = 'logger-service-provider',
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
