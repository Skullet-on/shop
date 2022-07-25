import BasketStore from "./BasketStore.js";
import FilterStore from "./FilterStore.js";
import ModalStore from "./ModalStore.js";
import ProductStore from "./ProductStore.js";
import ToastStore from "./ToastStore.js";
import UserStore from "./UserStore.js";

class RootStore {
  BasketStore = BasketStore;
  FilterStore = FilterStore;
  ModalStore = ModalStore;
  ProductStore = ProductStore;
  ToastStore = ToastStore;
  UserStore = UserStore;


  constructor() {
    Promise.all(["basket", this.BasketStore]);
  }
}

export default new RootStore();
