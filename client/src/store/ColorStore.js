import { makeAutoObservable } from "mobx";

export default class ColorStore {
  constructor() {
    this._colors = [];
    this._errors = {};

    makeAutoObservable(this);
  }

  setColors(colors) {
    this._colors = colors;
  }
  setErrors(errors) {
    this._errors = errors;
  }

  setColorErrors(colorId, errors) {
    this._colors = this._colors.map((color) => {
      if (color.id === colorId) {
        color.errors = errors;
      }
      return color;
    });
  }

  removeFieldErrors(field) {
    delete this._errors[field];
  }

  getColor(id) {
    return this._colors.filter((color) => color.id === id)[0];
  }

  get colors() {
    return this._colors;
  }
  get errors() {
    return this._errors;
  }
}
