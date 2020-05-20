import { Observable } from 'rxjs'

export interface IGatewayLogService {
    sendToRabbitmq(body: any): Observable<any>
}
