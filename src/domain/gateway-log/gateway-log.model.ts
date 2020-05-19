import { IGatewayLogModel } from './interface/model.interface'
import { Entity } from '../../common/entity'

export class GatewayLogModel extends Entity implements IGatewayLogModel {
    private _messageLog: string
    private _typeFrom: string
    private _queue: string

    constructor() {
        super()
    }

    public getMessageLog(): string {
        return this._messageLog
    }

    public getQueue(): string {
        return this._queue
    }

    public getTypeFrom(): string {
        return this._typeFrom
    }

    public setMessageLog(messageLog: string): void {
        this._messageLog = messageLog
    }

    public setQueue(queue: string): void {
        this._queue = queue
    }

    public setTypeFrom(typeFrom: string): void {
        this._typeFrom = typeFrom
    }
}
