import { Observable } from 'rxjs'
import { IGatewayLogValidator } from './validator.interface'

export interface IGatewayLogService {
    sendToRabbitmq(body: IGatewayLogValidator): Observable<any>
}
