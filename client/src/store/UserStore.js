import { makeAutoObservable } from "mobx";
import { login, registration, logout, check } from "../http/userApi";
import { LS_TOKEN } from "../utils/constants";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._isLoading = false;
    this._errors = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setIsLoading(bool) {
    this._isLoading = bool;
  }
  setErrors(errors) {
    this._errors = errors;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isLoading() {
    return this._isLoading;
  }

  get errors() {
    return this._errors;
  }

  removeErrorField(field) {
    delete this._errors[field];
  }

  async login(email, password) {
    try {
      const response = await login(email, password);

      localStorage.setItem(LS_TOKEN, response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
      this.setErrors({});
    } catch (e) {
      this.setErrors(e.response.data);
    }
  }

  async registration(email, password) {
    try {
      const response = await registration(email, password);

      localStorage.setItem(LS_TOKEN, response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
      this.setErrors({});
    } catch (e) {
      this.setErrors(e.response.data.errors);
    }
  }

  async logout() {
    try {
      await logout();

      localStorage.removeItem(LS_TOKEN);

      this.setIsAuth(false);
      this.setUser({});
      this.setErrors({});
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async check() {
    this.setIsLoading(true);
    try {
      const response = await check();

      localStorage.setItem(LS_TOKEN, response.data.accessToken);

      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response.data.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
