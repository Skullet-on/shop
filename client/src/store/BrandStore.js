import { makeAutoObservable } from "mobx";

export default class BrandStore {
  constructor() {
    this._brands = [];
    this._errors = {};
    this._selectedBrand = {};

    makeAutoObservable(this);
  }

  setBrands(brands) {
    this._brands = brands;
  }
  setErrors(errors) {
    this._errors = errors;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }

  setBrandErrors(brandId, errors) {
    this._brands = this._brands.map((brand) => {
      if (brand.id === brandId) {
        brand.errors = errors;
      }
      return brand;
    });
  }

  getBrand(id) {
    return this._brands.filter((brand) => brand.id === id)[0];
  }

  get brands() {
    return this._brands;
  }
  get errors() {
    return this._errors;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}
