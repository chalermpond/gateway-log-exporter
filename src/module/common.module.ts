import {
    Global,
    Module,
    Provider,
} from '@nestjs/common'
import {
    commonProviders,
    loggerServiceProviders,
    rabbitmq,
} from '../provider/common.provider'

const globalProviders: Provider[] = [
    ...commonProviders,
    // rabbitmq,
    loggerServiceProviders,
]

@Global()
@Module({
    providers: globalProviders,
    controllers: [
    ],
    exports: globalProviders,
})
export class CommonModule {
}
