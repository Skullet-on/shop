import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._products = [];
    this._selectedProduct = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 10;
    this._search = "";

    makeAutoObservable(this);
  }

  setProducts(products) {
    this._products = products;
  }
  setSelectedProduct(product) {
    this._selectedProduct = product;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  setSearch(search) {
    this._search = search;
  }

  get products() {
    return this._products;
  }
  get selectedProduct() {
    return this._selectedProduct;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
  get search() {
    return this._search;
  }
}
