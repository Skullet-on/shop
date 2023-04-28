import { makeAutoObservable } from "mobx";

export default class ToastStore {
  constructor() {
    this._message = "";
    this._show = false;
    this._variant = "light";

    makeAutoObservable(this);
  }

  setMessage(message) {
    this._message = message;
  }

  setShow(show) {
    this._show = show;
  }

  setVariant(variant) {
    this._variant = variant;
  }

  setInfoToast(message) {
    this._message = message;
    this._variant = 'info';
    this._show = true;
  }

  get message() {
    return this._message;
  }

  get show() {
    return this._show;
  }

  get variant() {
    return this._variant;
  }
}
