import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class ProfileGuard implements CanActivate {
    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const headers = request.headers
        const profileJwt = headers['x-profile']
        const profile = jwt.decode(profileJwt)
        return !!profile
    }
}

export class AdminGuard implements CanActivate {
    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const headers = request.headers
        const profileJwt = headers.authorization
        const auth: any = jwt.decode(profileJwt)
        const admin = auth && auth.roles.find(role => role === 'admin')
        return !!admin
    }
}
