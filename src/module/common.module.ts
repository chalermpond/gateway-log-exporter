import {
    Global,
    Module,
    Provider,
} from '@nestjs/common'
import {
    commonProviders,
} from '../provider/common.provider'

const globalProviders: Provider[] = [
    ...commonProviders,
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
