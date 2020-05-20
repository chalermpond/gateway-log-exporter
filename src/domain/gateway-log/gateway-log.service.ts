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

        // console.log('message: ', body.getMessageLog())
        // console.log(body)
        const messageLog: IMessageLog = {
            messageLog: JSON.stringify(body),
            queue: 'gateway-log-exporter'
        }
        return this._rabbitmqAdapter.sendToRabbitmq(messageLog)
    }
}
