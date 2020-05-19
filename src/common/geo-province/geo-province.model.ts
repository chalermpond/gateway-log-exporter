import {
    IGeoProvinceModel,
} from './interface/model.interface'
import { Entity } from '../entity'

export class GeoProvinceModel extends Entity implements IGeoProvinceModel {
    private _province: string
    private _geoId: string
    private _geoName: string

    constructor() {
        super()
    }

    public getProvince(): string {
        return this._province
    }

    public getGeoId(): string {
        return this._geoId
    }

    public getGeoName(): string {
        return this._geoName
    }

    public setProvince(province: string): void {
        this._province = province
    }

    public setGeoId(geoId: string): void {
        this._geoId = geoId
    }

    public setGeoName(geoName: string): void {
        this._geoName = geoName
    }
}