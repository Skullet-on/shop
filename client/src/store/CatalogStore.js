import { makeAutoObservable } from "mobx";

export default class CatalogStore {
  constructor() {
    this._catalogs = [];
    this._errors = {};
    this._selectedCatalog = {};

    makeAutoObservable(this);
  }

  setCatalogs(catalogs) {
    this._catalogs = catalogs;
  }
  setErrors(errors) {
    this._errors = errors;
  }
  setSelectedCatalog(catalog = {}) {
    this._selectedCatalog = catalog;
  }

  setCatalogErrors(catalogId, errors) {
    this._catalogs = this._catalogs.map((catalog) => {
      if (catalog.id === catalogId) {
        catalog.errors = errors;
      }
      return catalog;
    });
  }

  getCatalog(id) {
    return this._catalogs.filter((catalog) => catalog.id === id)[0];
  }

  get catalogs() {
    return this._catalogs;
  }
  get errors() {
    return this._errors;
  }
  get selectedCatalog() {
    return this._selectedCatalog;
  }
}
