import { IEntity } from '../../interface/entity.interface'

export interface IProvinceModel extends IEntity {
    getDistrict(): string

    getAmphoe(): string

    getProvince(): string

    getZipCode(): string

    getDistrictCode(): number

    getAmphoeCode(): number

    getProvinceCode(): number

    getGeoId(): number

    getGeoName(): string

    setDistrict(district: string): void

    setAmphoe(amphoe: string): void

    setProvince(province: string): void

    setZipCode(zipCode: string): void

    setDistrictCode(districtCode: number): void

    setAmphoeCode(amphoeCode: number): void

    setProvinceCode(provinceCode: number): void

    setGeoId(geoId: number): void

    setGeoName(geoName: string): void
}
