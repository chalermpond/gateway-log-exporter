import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import * as Config from 'config'
import { IConfig } from '../common/interface/config.interface'
import { providerNames } from './provider.name'
import {
  Db,
  MongoClient,
} from 'mongodb'
// import { ProvinceRepositoryMapping } from '../repository/province'
import { IRepositoryMapping } from '../common/interface/repository.interface'
import { IProvinceModel } from '../common/province'
// import { IProvinceSchema } from '../repository/province'
// import { ProvinceRepository } from '../repository/province'
import { IProvinceRepository } from '../common/province'
import { ProvinceService } from '../common/province'
// import { GeoProvinceRepositoryMapping } from '../repository/geo-province/geo-province.mapping'
// import { IGeoProvinceSchema } from '../repository/geo-province/geo-province.schema'
import { IGeoProvinceModel } from '../common/geo-province/interface/model.interface'
// import { GeoProvinceRepository } from '../repository/geo-province/geo-province.repository'
import { IGeoProvinceRepository } from '../common/geo-province/interface/repository.interface'
import { GroProvinceService } from '../common/geo-province/gro-province.service'
import { Auth } from '../common/auth'
import * as amqp from 'amqplib/callback_api'
import { Logger } from '../common/logger'
import { Scope } from '@nestjs/common'

// export const mongoConnection: Provider = {
//     provide: providerNames.MONGO_CONNECTION,
//     useFactory: async (config: IConfig): Promise<Db> => {
//         if (config && config.mongodb) {
//             const mongoConfig = config.mongodb
//             const servers = process.env.MONGO_URL || mongoConfig.servers
//             let auth = ''
//             if (mongoConfig.username || mongoConfig.password) {
//                 auth = `${mongoConfig.username}:${mongoConfig.password}@`
//             }
//             let url: string =
//                 'mongodb://' +
//                 auth +
//                 servers
//                     .split(',')
//                     .map((server: string) => {
//                         return server + ':' + mongoConfig.port
//                     })
//                     .toString() +
//                 '/' +
//                 mongoConfig.dbName
//
//             if (mongoConfig.authSource) {
//                 url += `?authSource=${mongoConfig.authSource}`
//             }
//             return await MongoClient.connect(url, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             }).then((client: MongoClient) => client.db(mongoConfig.dbName))
//         }
//
//         return Promise.reject('Cannot connect MongoDB')
//     },
//     inject: [ providerNames.CONFIG ],
// }

export const commonProviders: Provider[] = [
    {
        provide: providerNames.CONFIG,
        useFactory: (): IConfig => Config.util.toObject(),
    },
]

// export const provinceRepositoryProvider: Provider[] = [
//   {
//     provide: providerNames.PROVINCE_REPOSITORY_MAPPING,
//     useClass: ProvinceRepositoryMapping,
//   },
//   {
//     provide: providerNames.PROVINCE_REPOSITORY,
//     inject: [
//         providerNames.MONGO_CONNECTION,
//         providerNames.PROVINCE_REPOSITORY_MAPPING,
//     ],
//     useFactory: (
//         db: Db,
//         mapping: IRepositoryMapping<IProvinceModel, IProvinceSchema>,
//     ) => {
//       return new ProvinceRepository(db, mapping)
//     },
//   },
// ]

// export const provinceService: Provider = {
//   provide: providerNames.PROVINCE_SERVICE,
//   inject: [
//       providerNames.PROVINCE_REPOSITORY,
//   ],
//   useFactory: (
//       provinceRepository: IProvinceRepository,
//   ) => {
//     return new ProvinceService(
//         provinceRepository,
//     )
//   },
// }

// export const geoProvinceRepository: Provider[] = [
//     {
//         provide: providerNames.GEO_PROVINCE_REPOSITORY_MAPPING,
//         useClass: GeoProvinceRepositoryMapping,
//     },
//     {
//         provide: providerNames.GEO_PROVINCE_REPOSITORY,
//         inject: [
//             providerNames.MONGO_CONNECTION,
//             providerNames.GEO_PROVINCE_REPOSITORY_MAPPING,
//         ],
//         useFactory: (
//             db: Db,
//             mapping: IRepositoryMapping<IGeoProvinceModel, IGeoProvinceSchema>,
//         ) => {
//             return new GeoProvinceRepository(db, mapping)
//         },
//     },
// ]

export const geoProvinceService: Provider = {
    provide: providerNames.GEO_PROVINCE_SERVICE,
    inject: [
        providerNames.GEO_PROVINCE_REPOSITORY,
    ],
    useFactory: (
        geoProvince: IGeoProvinceRepository,
    ) => {
        return new GroProvinceService(
            geoProvince,
        )
    },
}

// export const authServiceProviders: Provider = {
//     provide: providerNames.AUTH_SERVICE,
//     inject: [
//         providerNames.CONFIG,
//     ],
//     useFactory: (
//         config: IConfig,
//     ) => {
//         return new Auth(config)
//     },
// }

export const loggerServiceProviders: Provider = {
    provide: providerNames.LOGGER_SERVICE,
    useClass: Logger,
    scope: Scope.TRANSIENT,
}

export const rabbitmq: Provider = {
    provide: providerNames.RABBITMQ,
    useFactory: () => {
        return amqp.connect('amqp://guest:guest@localhost:5672', (error0, connection) => {
            if (error0) {
                console.log('error connect')
                throw error0
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    console.log('error create chanel')
                    throw error1
                }

                const queue = 'hello'
                const msg = 'Hello world'

                channel.assertQueue(queue, {
                    durable: false
                })

                channel.sendToQueue(queue, Buffer.from(msg))
                console.log(" [x] Sent %s", msg)
            })
        })
    }
}
