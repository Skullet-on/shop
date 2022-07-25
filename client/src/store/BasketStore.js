import { makeAutoObservable } from "mobx";

class BasketStore {
  constructor() {
    this._items = [];

    makeAutoObservable(this);
  }

  setItem(item) {
    this._items.push(item);
  }

  setItems(items) {
    this._items = items;
  }

  removeItem(id) {
    this._items = this._items.filter((item) => item.id !== id);
  }

  setCount(id, count) {
    this._items = this._items.reduce((acc, curr) => {
      return curr.id === id
        ? [...acc, { ...curr, count: +count }]
        : [...acc, { ...curr }];
    }, []);
  }

  get items() {
    return this._items;
  }

  get totalSum() {
    const sum = this._items.reduce((sum, current) => {
      return (sum += current.product.price * current.count);
    }, 0);
    return sum;
  }
}

export default BasketStore;
