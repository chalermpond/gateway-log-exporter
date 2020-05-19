import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { IAuthService } from '../interface/auth.interface'
import { Reflector } from '@nestjs/core'
import * as _ from 'lodash'
import { Auth } from '../auth'

export enum RoleAccessLevel {
    Read = 'read',
    Full = 'full',
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        @Inject(Auth)
        private readonly _authService: IAuthService,
        private readonly _reflector: Reflector,
    ) {
    }

    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const headers = request.headers
        const profileJwt = headers.authorization
        const expectedRoles = this._reflector.get<string[]>(
            'roles',
            context.getHandler(),
        )

        // const token = _replace(
        //     _get(profileJwt, 'authorization', ''),
        //     /^Bearer\s/ig,
        //     '',
        // )

        const token = profileJwt && profileJwt.replace(/^Bearer\s/g, '')

        try {
            const jwt = this._authService.verifyToken(token.toString())
            console.log(`jwt :: `, jwt)

            const roleId = _.get(jwt, 'roles', null)
            const findRole = _.indexOf(roleId, expectedRoles[0])

            if (findRole === -1) {
                return false
            }

            return !!jwt
        } catch (e) {
            return false
        }
    }
}
