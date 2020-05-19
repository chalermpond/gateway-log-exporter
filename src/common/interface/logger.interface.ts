export interface ILoggerService {
    setContext(context: string)

    info(message: string)

    warn(message: string)

    error(message: string)
}