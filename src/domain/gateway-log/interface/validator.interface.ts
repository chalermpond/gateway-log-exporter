export interface IGatewayLogValidator {
    getMessageLog(): string

    getTypeFrom(): string

    getQueue(): string
}
