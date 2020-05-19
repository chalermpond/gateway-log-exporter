import { IEntity } from '../../../common/interface/entity.interface'

export interface IGatewayLogModel extends IEntity {
    getMessageLog(): string

    setMessageLog(messageLog: string): void

    getTypeFrom(): string

    setTypeFrom(typeFrom: string): void

    getQueue(): string

    setQueue(queue: string): void
}
