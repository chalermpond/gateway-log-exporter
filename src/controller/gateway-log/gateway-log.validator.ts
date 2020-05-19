import { IGatewayLogValidator } from '../../domain/gateway-log/interface/validator.interface'
import {
    IsDefined,
    IsString,
} from 'class-validator'

export class GatewayLogValidator implements IGatewayLogValidator {
    @IsDefined()
    @IsString()
    private readonly messageLog: string
    private readonly typeFrom: string
    @IsDefined()
    @IsString()
    private readonly queue: string

    public getMessageLog(): string {
        return this.messageLog
    }

    public getTypeFrom(): string {
        return this.typeFrom
    }

    public getQueue(): string {
        return this.queue
    }
}
