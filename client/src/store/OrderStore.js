import { makeAutoObservable } from "mobx";

class OrderStore {
  constructor() {
    this._items = [];
    this._errors = {};

    makeAutoObservable(this);
  }

  setItem(item) {
    this._items.push(item);
  }

  setErrors(errors) {
    this._errors = errors;
  }

  setItems(items) {
    this._items = items;
  }

  removeItem(id) {
    this._items = this._items.filter((item) => item.id !== id);
  }

  removeFieldErrors(field) {
    delete this._errors[field];
  }

  getNotIsDoneCount() {
    return this._items.filter((item) => !item.isDone).length
  }

  get items() {
    return this._items;
  }

  get errors() {
    return this._errors;
  }
}

export default OrderStore;
