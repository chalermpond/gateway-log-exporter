import { IAuthService } from './interface/auth.interface'
import { IConfig } from './interface/config.interface'
import {
  Observable,
  of,
} from 'rxjs'
import {
  HttpException,
  HttpStatus,
} from '@nestjs/common'

import {
  sign,
  verify,
  VerifyOptions,
} from 'jsonwebtoken'
import { tap } from 'rxjs/internal/operators/tap'
import { mergeMap } from 'rxjs/operators'

export class Auth implements IAuthService {
  private readonly _signAlgorithm: 'RS256'
  protected _publicKey: Buffer
  protected _privateKey: Buffer
  private readonly _tokenTTL: string = '10m'
  private readonly _refreshTTL: string = '2h'
  protected _ignoreExpiration: boolean

  constructor(
      private readonly _config: IConfig,
  ) {
    this._ignoreExpiration = !!this._config.auth.ignoreExpiration
    this._publicKey = Buffer.from(this._config.auth.public, 'utf8')
    this._privateKey = Buffer.from(this._config.auth.private, 'utf8')
  }

  public generateToken(payload: any): Observable<any> {
    return of({
      accessToken: this._generateAccessToken(payload),
      refreshToken: this._generateRefreshToken(payload),
    })
  }

  public _generateAccessToken(payload: any): string {
    return sign(payload,
        this._privateKey,
        {
          algorithm: 'RS256',
          expiresIn: this._tokenTTL,
        })
  }

  public _generateRefreshToken(payload: any): string {
    return sign({id: payload.id},
        this._privateKey,
        {
          algorithm: 'RS256',
          expiresIn: this._refreshTTL,
        })
  }

  public verifyToken(token: string): any {
    const verifyOpts: VerifyOptions = {
      algorithms: [this._signAlgorithm],
      ignoreExpiration: this._ignoreExpiration,
    }
    try {
      return verify(token, this._publicKey, verifyOpts)
    } catch (e) {
      return false
    }

  }

  public refreshToken(token: any): Observable<any> {
    return of(this.verifyToken(token)).pipe(
        tap((result: any) => {
          console.log(result)
          if (!result) {
            throw new HttpException(
                'Invalid Token',
                HttpStatus.BAD_REQUEST,
            )
          }
        }),
        mergeMap((decoded: any) => {
          return this.generateToken(decoded)
        }),
    )
  }

  public generateJWT(payload: any): Observable<string> {
    return of(
        sign(payload,
            this._privateKey,
        ),
    )
  }

  public verifyTokenIgnoreExpiration(token: string): any {
    const verifyOpts: VerifyOptions = {
      ignoreExpiration: true,
    }
    try {
      return verify(token, this._privateKey, verifyOpts)
    } catch (e) {
      return false
    }
  }

}
