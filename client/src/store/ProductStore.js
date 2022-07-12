import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._catalogs = [];
    this._brands = {};
    this._products = [];
    this._properties = [];
    this._selectedCatalog = {};
    this._selectedBrand = {};
    this._selectedProduct = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 10;

    makeAutoObservable(this);
  }

  setCatalogs(catalogs) {
    this._catalogs = catalogs;
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
  setSelectedCatalog(catalog) {
    this.setPage(1);
    this._selectedCatalog = catalog;
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
  getCatalog(id) {
    return this._catalogs.filter((catalog) => catalog.id === id)[0];
  }
  getProperty(id) {
    return this._properties.filter((property) => property.id === id)[0];
  }

  get catalogs() {
    return this._catalogs;
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
  get selectedCatalog() {
    return this._selectedCatalog;
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
