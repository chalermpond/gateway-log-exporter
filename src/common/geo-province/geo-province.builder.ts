import { GeoProvinceModel } from './geo-province.model'

export class GeoProvinceBuilder {
    private readonly _model: GeoProvinceModel

    constructor() {
        this._model = new GeoProvinceModel()
    }

    public build(): GeoProvinceModel {
        return this._model
    }

    public setId(id: string) {
        this._model.setId(id)
        return this
    }

    setProvince(province: string) {
        this._model.setProvince(province)
        return this
    }

    setGeoId(geoId: string) {
        this._model.setGeoId(geoId)
        return this
    }

    setGeoName(geoName: string) {
        this._model.setGeoName(geoName)
        return this
    }
}