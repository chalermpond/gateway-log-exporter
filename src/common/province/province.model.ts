import { IProvinceModel } from './interface/model.interface'
import { Entity } from '../entity'

export class ProvinceModel extends Entity implements IProvinceModel {
    private _district: string
    private _amphoe: string
    private _province: string
    private _zipCode: string
    private _districtCode: number
    private _amphoeCode: number
    private _provinceCode: number
    private _geoId: number
    private _geoName: string

    constructor(
        zipCode: string
    ) {
        super()
        this.setZipCode(zipCode)
    }

    public getAmphoe(): string {
        return this._amphoe
    }

    public getAmphoeCode(): number {
        return this._amphoeCode
    }

    public getDistrict(): string {
        return this._district
    }

    public getDistrictCode(): number {
        return this._districtCode
    }

    public getGeoId(): number {
        return this._geoId
    }

    public getGeoName(): string {
        return this._geoName
    }

    public getProvince(): string {
        return this._province
    }

    public getProvinceCode(): number {
        return this._provinceCode
    }

    public getZipCode(): string {
        return this._zipCode
    }

    public setDistrict(district: string): void {
        this._district = district
    }

    public setAmphoe(amphoe: string): void {
        this._amphoe = amphoe
    }

    public setProvince(province: string): void {
        this._province = province
    }

    public setZipCode(zipCode: string): void {
        this._zipCode = zipCode
    }

    public setDistrictCode(districtCode: number): void {
        this._districtCode = districtCode
    }

    public setAmphoeCode(amphoeCode: number): void {
        this._amphoeCode = amphoeCode
    }

    public setProvinceCode(provinceCode: number): void {
        this._provinceCode = provinceCode
    }

    public setGeoId(geoId: number): void {
        this._geoId = geoId
    }

    public setGeoName(geoName: string): void {
        this._geoName = geoName
    }

}
