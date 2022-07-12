import { makeAutoObservable } from "mobx";

export default class FilterStore {
  constructor() {
    this._minPrice = null;
    this._maxPrice = null;

    makeAutoObservable(this);
  }

  setMinPrice(price) {
    this._minPrice = price;
  }
  setMaxPrice(price) {
    this._maxPrice = price;
  }

  get minPrice() {
    return this._minPrice;
  }
  get maxPrice() {
    return this._maxPrice;
  }
}
