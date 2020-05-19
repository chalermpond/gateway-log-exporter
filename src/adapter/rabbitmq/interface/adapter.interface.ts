import { Observable } from 'rxjs'
import { IMessageLog } from './schema.interface'

export interface IRabbitmqAdapter {
    sendToRabbitmq(messageLog: IMessageLog): Observable<any>
}
