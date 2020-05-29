import { IGatewayLogService } from './interface/service.interface'
import {
    Observable,
    of,
} from 'rxjs'
import { IRabbitmqAdapter } from '../../adapter/rabbitmq/interface/adapter.interface'
import { IMessageLog } from '../../adapter/rabbitmq/interface/schema.interface'

export class GatewayLogService implements IGatewayLogService {
    constructor(
        private readonly _rabbitmqAdapter: IRabbitmqAdapter,
    ) {
    }

    public sendToRabbitmq(body: any): Observable<any> {
        const messageLog: IMessageLog = {
            messageLog: JSON.stringify(body),
            queue: process.env.AMQP_QUEUE_NAME || 'kong-log-default'
        }
        return this._rabbitmqAdapter.sendToRabbitmq(messageLog)
    }
}
