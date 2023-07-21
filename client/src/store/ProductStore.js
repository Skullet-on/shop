import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._products = [];
    this._selectedProduct = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 20;
    this._search = "";
    this._errors = {};

    makeAutoObservable(this);
  }

  setProducts(products) {
    this._products = products;
  }
  setSelectedProduct(product) {
    this._selectedProduct = product;
    this._errors = {}
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
  setErrors(errors) {
    this._errors = errors;
  }
  removeFieldErrors(field) {
    delete this._errors[field];
  }
  removePropertyErrors(field) {
    delete this._errors.properties[field];
  }

  getProduct(id) {
    return this._products.filter((product) => product.id === id)[0];
  }

  getProductColor(productId, colorId) {
    const product = this._products.filter(
      (product) => product.id === productId
    )[0];
    return product.colors.filter((color) => color.id === colorId);
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
  get errors() {
    return this._errors;
  }
}
