import { IProvinceModel } from './model.interface'
import { IRepository } from '../../interface/repository.interface'
import { Observable } from 'rxjs'

export interface IProvinceRepository extends IRepository<IProvinceModel> {
    find(filter?: any): Observable<IProvinceModel>
}
