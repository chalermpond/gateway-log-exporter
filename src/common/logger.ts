import { ILoggerService } from './interface/logger.interface'
import {
    Injectable,
    Scope,
} from '@nestjs/common'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

@Injectable({ scope: Scope.TRANSIENT})
export class Logger implements ILoggerService {
    private readonly _logger: winston.Logger
    private _context: string

    constructor() {
        const rotateTransport = new (DailyRotateFile)({
            filename: 'emcs-api-audit-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '10m',
            dirname: './Logs'
        })

        this._logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} [${this._context}] ${info.level}: ${info.message}`),
            ),
            transports: [
                rotateTransport,
            ],
        })
    }

    public setContext(context: string) {
        this._context = context
    }

    public error(message: string) {
        console.log(`******* logger error ******`)
        console.log(message)

        this._logger.log('error', message)
    }

    public warn(message: string) {
        console.log(`****** logger warning ******`)
        console.log(message)

        this._logger.log('warn', message)
    }

    public info(message: string) {
        console.log(`****** logger info ******`)
        console.log(message)

        this._logger.log('info', message)
    }
}