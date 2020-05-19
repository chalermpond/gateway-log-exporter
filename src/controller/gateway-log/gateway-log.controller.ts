import {
    Body,
    Controller,
    Inject,
    Post,
} from '@nestjs/common'
import { providerNames } from '../../provider/provider.name'
import { IGatewayLogService } from '../../domain/gateway-log/interface/service.interface'
import { GatewayLogValidator } from './gateway-log.validator'

@Controller('gateway/log')
export class GatewayLogController {
    constructor(
        @Inject(providerNames.GATEWAY_LOG_SERVICE)
        private readonly _gatewayLogService: IGatewayLogService,
    ) {
    }

    @Post('/message')
    public sendLog(
        @Body() body: GatewayLogValidator
    ) {
        return this._gatewayLogService.sendToRabbitmq(body)
    }
}
