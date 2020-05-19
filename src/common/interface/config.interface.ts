export interface IConfig {
    application: {
        host: string
        port: number
        // path: {
        //     upload: string
        // }
    }
    amqp: IRabbitmq
    // mongodb: IMongoDB
    auth: IAuth
    // recorderAudio: {
    //     path: string
    //     activeconf: string
    //     encrypt: string
    // },
    // audioEncryption: {
    //     password: string
    // }
    // maintenanceScript: string
    // backupVolume: string
}

export interface IMongoDB {
    servers: string
    port: number
    dbName: string
    username?: string
    password?: string
    authSource?: string
    replicaSetName?: string
}

export interface IAuth {
    ignoreExpiration: boolean
    public: string
    private: string
}

export interface IRabbitmq {
    host: string
    port: number
    username: string
    password: string
    server: string
}
