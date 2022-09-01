import { makeAutoObservable } from "mobx";

export default class PropertiesStore {
  constructor() {
    this._properties = [];
    this._errors = {};

    makeAutoObservable(this);
  }

  setProperties(properties) {
    this._properties = properties;
  }
  setErrors(errors) {
    this._errors = errors;
  }

  setPropertyErrors(propertyId, errors) {
    this._properties = this._properties.map((property) => {
      if (property.id === propertyId) {
        property.errors = errors;
      }
      return property;
    });
  }

  getProperty(id) {
    return this._properties.filter((property) => property.id === id)[0];
  }
  getPropertyName(id) {
    return (
      this._properties.filter((property) => property.id === id)[0] &&
      this._properties.filter((property) => property.id === id)[0].name
    );
  }

  get properties() {
    return this._properties;
  }
  get errors() {
    return this._errors;
  }
}
