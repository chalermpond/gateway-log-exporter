import {
    Body,
    Controller,
    Inject,
    Post,
} from '@nestjs/common'
import { providerNames } from '../../provider/provider.name'
import { IGatewayLogService } from '../../domain/gateway-log/interface/service.interface'

@Controller('/')
export class GatewayLogController {
    constructor(
        @Inject(providerNames.GATEWAY_LOG_SERVICE)
        private readonly _gatewayLogService: IGatewayLogService,
    ) {
    }

    @Post('/')
    public sendLog(
        @Body() body: any
    ) {
        return this._gatewayLogService.sendToRabbitmq(body)
    }
}
