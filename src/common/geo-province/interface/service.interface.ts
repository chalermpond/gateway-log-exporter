import { IGeoProvinceModel } from './model.interface'
import { Observable } from 'rxjs'
import { IGeoProvinceFilter } from './filter.interface'

export interface IGeoProvinceService {
    getById(id: string): Observable<IGeoProvinceModel>

    findProvince(filtering: IGeoProvinceFilter): Observable<IGeoProvinceModel>

    getAll(): Observable<IGeoProvinceModel>
}