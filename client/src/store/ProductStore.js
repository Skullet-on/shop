import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [];
    this._brands = {};
    this._products = [];
    this._properties = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._selectedProduct = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 10;

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setProducts(products) {
    this._products = products;
  }
  setProperties(properties) {
    this._properties = properties;
  }
  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
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

  getBrand(id) {
    return this._brands.filter((brand) => brand.id === id)[0];
  }
  getType(id) {
    return this._types.filter((type) => type.id === id)[0];
  }
  getProperty(id) {
    return this._properties.filter((property) => property.id === id)[0];
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get products() {
    return this._products;
  }
  get properties() {
    return this._properties;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
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
}
