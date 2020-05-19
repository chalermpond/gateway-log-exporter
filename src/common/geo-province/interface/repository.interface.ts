import { IGeoProvinceModel } from './model.interface'
import { IRepository } from '../../interface/repository.interface'
import { Observable } from 'rxjs'

export interface IGeoProvinceRepository extends IRepository<IGeoProvinceModel> {
    find(filter?: any): Observable<IGeoProvinceModel>
}