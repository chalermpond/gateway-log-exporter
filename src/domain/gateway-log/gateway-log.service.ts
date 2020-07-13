import { IGatewayLogService } from './interface/service.interface'
import {
    Observable,
    of,
} from 'rxjs'
import { IRabbitmqAdapter } from '../../adapter/rabbitmq/interface/adapter.interface'
import { IMessageLog } from '../../adapter/rabbitmq/interface/schema.interface'
import * as _ from 'lodash'
import * as moment from 'moment'

export class GatewayLogService implements IGatewayLogService {
    constructor(
        private readonly _rabbitmqAdapter: IRabbitmqAdapter,
    ) {
    }

    public sendToRabbitmq(body: any): Observable<any> {

        const clientIp = _.get(body,'client_ip','-')
        const username = _.get(body, 'consumer.username', '-')
        const startTime = moment(_.get(body, 'started_at')).format('DD/MMM/YYYY:HH:mm:ss ZZ')
        const uri = _.get(body, 'request.uri')
        const responseCode = _.get(body, 'response.status')
        const size  = _.get(body, 'response.size')

        // @ts-ignore
        const resolveNestedJson = (obj, prefix = '') => _.reduce(obj, (accumulator, value, key) => {
            if( _.isObject(value)) {
                return _.assign(accumulator, resolveNestedJson(value, `${prefix}_${key}`))
            }

            accumulator[`${prefix}_${key}`] = value
            return accumulator
        }, {})

        const remapped = resolveNestedJson(body)

        const gelf = {
            version: '1.1',
            level: responseCode >= 500 ? 3 : 1,
            host: _.get(body, 'request.headers.host'),
            short_message: `${_.get(body,'request.uri')} ${_.get(body, 'response.status')} ${_.get(body, 'response.size')}`,
            full_message: `${clientIp} - ${username} [${startTime}] "${_.get(body,'request.method')} ${uri}" ${responseCode} ${size}`,

        }

        const messageLog: IMessageLog = {
            messageLog: JSON.stringify(_.assign(gelf, remapped)),
            queue: process.env.AMQP_QUEUE_NAME || 'kong-log-default'
        }
        return this._rabbitmqAdapter.sendToRabbitmq(messageLog)
    }
}
