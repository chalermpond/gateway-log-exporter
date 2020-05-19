import { IEntity } from '../../interface/entity.interface'

export interface IGeoProvinceModel extends IEntity {
    getProvince(): string

    getGeoId(): string

    getGeoName(): string

    setProvince(province: string): void

    setGeoId(geoId: string): void

    setGeoName(geoName: string): void
}