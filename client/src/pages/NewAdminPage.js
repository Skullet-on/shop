import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import CreateProductForm from "../components/CreateProductForm";
import EditProductForm from "../components/EditProductForm";
import CreateBrand from "../components/modals/CreateBrandModal";
import CreateProperty from "../components/modals/CreatePropertyModal";
import CreateCatalog from "../components/modals/CreateCatalogModal";
import {
  fetchBrands,
  fetchProducts,
  fetchCatalogs,
  fetchProperties,
} from "../http/productApi";
import { Context } from "../index";
import CatalogList from "../components/CatalogList";
import AddProperty from "../components/modals/AddPropertyModal";
import BrandList from "../components/BrandList";
import PropertyList from "../components/PropertyList";

const NewAdminPage = observer(() => {
  const {
    productStore,
    brandStore,
    catalogStore,
    propertiesStore,
    modalStore,
  } = useContext(Context);

  const [tab, setTab] = useState("catalogs");

  useEffect(() => {
    fetchCatalogs().then((data) => catalogStore.setCatalogs(data));
    fetchBrands().then((data) => brandStore.setBrands(data));
    fetchProducts().then((data) => productStore.setProducts(data.rows));
    fetchProperties().then((data) => propertiesStore.setProperties(data));
  }, []);

  useEffect(() => {
    fetchCatalogs().then((data) => catalogStore.setCatalogs(data));
  }, [modalStore.createCatalogModal.show, modalStore.addPropertyModal.show]);

  useEffect(() => {
    fetchBrands().then((data) => brandStore.setBrands(data));
  }, [modalStore.createBrandModal.show]);

  useEffect(() => {
    fetchProperties().then((data) => propertiesStore.setProperties(data));
  }, [modalStore.createPropertyModal.show]);

  return (
    <Container className="mt-3">
      <Tabs
        defaultActiveKey="profile"
        activeKey={tab}
        onSelect={(t) => setTab(t)}
        className="mb-3 mt-3"
      >
        <Tab eventKey="catalogs" title="Каталоги">
          <Button
            variant="outline-dark"
            onClick={() => modalStore.createCatalogModal.setShow(true)}
          >
            Добавить каталог
          </Button>
          <CatalogList />
        </Tab>
        <Tab eventKey="properties" title="Свойства">
          <Button
            variant="outline-dark"
            onClick={() => modalStore.createPropertyModal.setShow(true)}
          >
            Добавить свойство
          </Button>
          <PropertyList />
        </Tab>
        <Tab eventKey="brands" title="Бренды">
          <Button
            variant="outline-dark"
            onClick={() => modalStore.createBrandModal.setShow(true)}
          >
            Добавить бренд
          </Button>
          <BrandList />
        </Tab>
        <Tab eventKey="create" title="Добавить товар">
          <CreateProductForm />
        </Tab>
        <Tab eventKey="edit" title="Редактировать товар">
          <EditProductForm />
        </Tab>
      </Tabs>
      <CreateBrand
        show={modalStore.createBrandModal.show}
        onHide={() => modalStore.createBrandModal.setShow(false)}
      />
      <CreateCatalog
        show={modalStore.createCatalogModal.show}
        onHide={() => modalStore.createCatalogModal.setShow(false)}
      />
      <CreateProperty
        show={modalStore.createPropertyModal.show}
        onHide={() => modalStore.createPropertyModal.setShow(false)}
      />
      <AddProperty
        show={modalStore.addPropertyModal.show}
        onHide={() => {
          modalStore.addPropertyModal.setShow(false);
          modalStore.addPropertyModal.setCatalogId(null);
        }}
        catalogId={modalStore.addPropertyModal.catalogId}
      />
    </Container>
  );
});

export default NewAdminPage;
