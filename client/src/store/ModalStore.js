import { makeAutoObservable } from "mobx";

export default class ModalStore {
  constructor() {
    this._createBrandModal = {
      show: false,
      setShow: function(value) {
        this.show = value;
      },
    };

    this._createCatalogModal = {
      show: false,
      setShow: function(value) {
        this.show = value;
      },
    };

    this._createPropertyModal = {
      show: false,
      setShow: function(value) {
        this.show = value;
      },
    };

    this._oneClickBuyModal = {
      show: false,
      setShow: function(value) {
        this.show = value;
      },
      product: null,
      setProduct: function(value) {
        this.product = value;
      },
    };

    this._addPropertyModal = {
      show: false,
      setShow: function(value) {
        this.show = value;
      },
      catalogId: null,
      setCatalogId: function(value) {
        this.catalogId = value;
      },
    };

    makeAutoObservable(this);
  }

  get createBrandModal() {
    return this._createBrandModal;
  }

  get createCatalogModal() {
    return this._createCatalogModal;
  }

  get createPropertyModal() {
    return this._createPropertyModal;
  }

  get oneClickBuyModal() {
    return this._oneClickBuyModal;
  }

  get addPropertyModal() {
    return this._addPropertyModal;
  }
}
