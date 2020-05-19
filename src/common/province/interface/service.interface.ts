import { IProvinceModel } from './model.interface'
import { Observable } from 'rxjs'
import { IFilterProvince } from './filter.interface'

export interface IProvinceService {
    getById(id: string): Observable<IProvinceModel>

    findProvince(filtering: IFilterProvince): Observable<IProvinceModel>

    getAll(): Observable<IProvinceModel>

}
