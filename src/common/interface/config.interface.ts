export interface IConfig {
    application: {
        host: string
        port: number
    }
    amqp: IRabbitmq
}

export interface IRabbitmq {
    host: string
    port: number
    username: string
    password: string
    server: string
}
