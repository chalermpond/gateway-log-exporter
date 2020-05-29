import { NestFactory } from '@nestjs/core'
import { MainModule } from './module/main.module'
import * as Config from 'config'
import { ValidationPipe } from '@nestjs/common'
import * as _ from 'lodash'

async function bootstrap() {
    const port: number =
        _.toNumber(process.env.NODE_PORT) || Config.get('application.port')
    const app = await NestFactory.create(MainModule)
    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )
    await app.listen(port)
    return port
}

bootstrap().then(port => {
    console.log(`application started on port ${port}`)
    console.log(`AMQP send to ${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`)
})
