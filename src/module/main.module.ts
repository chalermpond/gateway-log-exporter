import { Module } from '@nestjs/common'
import { CommonModule } from './common.module'
import { GatewayModule } from './gateway.module'

@Module({
    imports: [
        CommonModule,
        GatewayModule,
    ],
    providers: [],
    controllers: [],
    exports: [],
})
export class MainModule {

}
