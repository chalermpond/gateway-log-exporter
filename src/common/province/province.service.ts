import { IProvinceService } from './interface/service.interface'
import { IProvinceModel } from './interface/model.interface'
import {
    Observable,
    of,
} from 'rxjs'
import { IProvinceRepository } from './interface/repository.interface'
import { ObjectId } from 'bson'
import { throwIfEmpty } from 'rxjs/operators'
import {
    BadRequestException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { IFilterProvince } from './interface/filter.interface'
import * as _ from 'lodash'

export class ProvinceService implements IProvinceService {
    constructor(
        private readonly _provinceRepository: IProvinceRepository,
    ) {
    }

    public findProvince(filtering: IFilterProvince): Observable<IProvinceModel> {
        const andFilter: any[] = []

        if (!_.isNil(filtering.district)) {
            andFilter.push({
                district: { $regex: filtering.district },
            })
        }

        if (!_.isNil(filtering.amphoe)) {
            andFilter.push({
                amphoe: { $regex: filtering.amphoe },
            })
        }

        if (!_.isNil(filtering.province)) {
            andFilter.push({
                province: { $regex: filtering.province },
            })
        }

        if (!_.isNil(filtering.zipCode)) {
            andFilter.push({
                zipcode: { $regex: filtering.zipCode },
            })
        }

        let mongoFilter = {}

        if (andFilter.length > 0) {
            mongoFilter = {
                $and: andFilter,
            }
            return this._provinceRepository.find(mongoFilter)
        } else {
            return of()
        }
    }

    public getById(id: string): Observable<IProvinceModel> {
        if (!ObjectId.isValid(id)) {
            throw  new BadRequestException(`Invalid ID`)
        }
        return this._provinceRepository.find({ _id: new ObjectId(id) }).pipe(
            throwIfEmpty(() => {
                throw new HttpException(`Province Not Found`, HttpStatus.NOT_FOUND)
            }),
        )
    }

    public getAll(): Observable<IProvinceModel> {
        return this._provinceRepository.find().pipe(
            throwIfEmpty(() => {
                throw new HttpException(`Province Not Found`, HttpStatus.NOT_FOUND)
            })
        )
    }

}
