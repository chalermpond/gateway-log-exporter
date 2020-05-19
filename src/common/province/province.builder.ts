import { ProvinceModel } from './province.model'

export class ProvinceBuilder {
    private readonly _model: ProvinceModel

    constructor(zipCode: string) {
        this._model = new ProvinceModel(zipCode)
        this._model.setZipCode(zipCode)
    }

    public build(): ProvinceModel {
        return this._model
    }

    public setId(id: string) {
        this._model.setId(id)
        return this
    }

    public setDistrict(district: string) {
        this._model.setDistrict(district)
        return this
    }

    public setAmphoe(amphoe: string) {
        this._model.setAmphoe(amphoe)
        return this
    }

    public setProvince(province: string) {
        this._model.setProvince(province)
        return this
    }

    public setZipCode(zipCode: string) {
        this._model.setZipCode(zipCode)
        return this
    }

    public setDistrictCode(districtCode: number) {
        this._model.setDistrictCode(districtCode)
        return this
    }

    public setAmphoeCode(amphoeCode: number) {
        this._model.setAmphoeCode(amphoeCode)
        return this
    }

    public setProvinceCode(provinceCode: number) {
        this._model.setProvinceCode(provinceCode)
        return this
    }

    public setGeoId(geoId: number) {
        this._model.setGeoId(geoId)
        return this
    }

    public setGeoName(geoName: string) {
        this._model.setGeoName(geoName)
        return this
    }
}

