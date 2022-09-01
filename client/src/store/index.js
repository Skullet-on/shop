import BasketStore from "./BasketStore";
import BrandStore from "./BrandStore";
import CatalogStore from "./CatalogStore";
import FilterStore from "./FilterStore";
import ModalStore from "./ModalStore";
import ProductStore from "./ProductStore";
import PropertiesStore from "./PropertiesStore";
import ToastStore from "./ToastStore";
import UserStore from "./UserStore";

const userStore = new UserStore();
const productStore = new ProductStore();
const filterStore = new FilterStore();
const modalStore = new ModalStore();
const toastStore = new ToastStore();
const basketStore = new BasketStore();
const brandStore = new BrandStore();
const catalogStore = new CatalogStore();
const propertiesStore = new PropertiesStore();

export default {
  userStore,
  productStore,
  filterStore,
  modalStore,
  toastStore,
  basketStore,
  brandStore,
  catalogStore,
  propertiesStore,
};
