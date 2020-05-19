import { IGeoProvinceService } from './interface/service.interface'
import { IGeoProvinceRepository } from './interface/repository.interface'
import { IGeoProvinceFilter } from './interface/filter.interface'
import {
    Observable,
    of,
} from 'rxjs'
import { IGeoProvinceModel } from './interface/model.interface'
import { throwIfEmpty } from 'rxjs/operators'
import {
    BadRequestException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { ObjectId } from 'bson'
import * as _ from 'lodash'

export class GroProvinceService implements IGeoProvinceService {
    constructor(
        private readonly _geoProvinceRepository: IGeoProvinceRepository
    ) {}

    public findProvince(filtering: IGeoProvinceFilter): Observable<IGeoProvinceModel> {
        const andFilter: any[] = []
        if (!_.isNil(filtering.province)) {
            andFilter.push({
                province: { $regex: filtering.province}
            })
        }
        if (!_.isNil(filtering.geoId)) {
            andFilter.push({
                geoId: filtering.geoId
            })
        }
        if (!_.isNil(filtering.geoName)) {
            andFilter.push({
                geoName: filtering.geoName
            })
        }

        let mongoFilter = {}

        if (andFilter.length > 0) {
            mongoFilter = {
                $and: andFilter
            }
            return this._geoProvinceRepository.find(mongoFilter).pipe(
                throwIfEmpty(() => {
                    throw new HttpException(`Geo Province Not Found`, HttpStatus.NOT_FOUND)
                })
            )
        } else {
            return of()
        }

    }

    public getAll(): Observable<IGeoProvinceModel> {
        return this._geoProvinceRepository.find().pipe(
            throwIfEmpty(() => {
                throw new HttpException(`Geo Province Not Found`, HttpStatus.NOT_FOUND)
            })
        )
    }

    public getById(id: string): Observable<IGeoProvinceModel> {
        // if (!ObjectId.isValid(id)) {
        //     throw  new BadRequestException(`Invalid ID`)
        // }
        return this._geoProvinceRepository.find({ _id: new ObjectId(id) }).pipe(
            throwIfEmpty(() => {
                throw new HttpException(`Province Not Found`, HttpStatus.NOT_FOUND)
            }),
        )
    }


}