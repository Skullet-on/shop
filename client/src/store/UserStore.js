import { makeAutoObservable } from 'mobx';
import { login, registration, logout, check } from '../http/userApi';

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    this._isLoading = false
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setUser(user) {
    this._user = user
  }
  setIsLoading(bool) {
    this._isLoading = bool
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get isLoading() {
    return this._isLoading
  }

  async login(email, password) {
    try {
      const response = await login(email, password);

      localStorage.setItem('token', response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(email, password) {
    try {
      const response = await registration(email, password);

      localStorage.setItem('token', response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async logout() {
    try {
      await logout();

      localStorage.removeItem('token');

      this.setIsAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async check() {
    this.setIsLoading(true);
    try {
      const response = await check();

      localStorage.setItem('token', response.data.accessToken);

      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response.data.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
