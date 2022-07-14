import { makeAutoObservable } from "mobx";

export default class FilterStore {
  constructor() {
    this._minPrice = null;
    this._maxPrice = null;
    this._brands = [];

    makeAutoObservable(this);
  }

  setMinPrice(price) {
    this._minPrice = price;
  }
  setMaxPrice(price) {
    this._maxPrice = price;
  }
  setBrands(brand) {
    this._brands = brand;
  }

  get minPrice() {
    return this._minPrice;
  }
  get maxPrice() {
    return this._maxPrice;
  }
  get brands() {
    return this._brands;
  }
}
