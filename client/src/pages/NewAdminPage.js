import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import CreateProductForm from "../components/CreateProductForm";
import EditProductForm from "../components/EditProductForm";
import CreateBrand from "../components/modals/CreateBrand";
import CreateProperty from "../components/modals/CreateProperty";
import CreateCatalog from "../components/modals/CreateCatalog";
import {
  fetchBrands,
  fetchProducts,
  fetchCatalogs,
  fetchProperties,
} from "../http/productApi";
import { Context } from "../index";
import CatalogList from "../components/CatalogList";
import AddProperty from "../components/modals/AddProperty";
import BrandList from "../components/BrandList";

const NewAdminPage = observer(() => {
  const { product, modal } = useContext(Context);

  const [tab, setTab] = useState("catalogs");

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts().then((data) => product.setProducts(data.rows));
    fetchProperties().then((data) => product.setProperties(data));
  }, []);

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
  }, [modal.createCatalogModal.show, modal.addPropertyModal.show]);

  useEffect(() => {
    fetchBrands().then((data) => product.setBrands(data));
  }, [modal.createBrandModal.show]);

  useEffect(() => {
    fetchProperties().then((data) => product.setProperties(data));
  }, [modal.createPropertyModal.show]);

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
            onClick={() => modal.createCatalogModal.setShow(true)}
          >
            Добавить каталог
          </Button>
          <CatalogList />
        </Tab>
        <Tab eventKey="brands" title="Бренды">
          <Button
            variant="outline-dark"
            onClick={() => modal.createBrandModal.setShow(true)}
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
        show={modal.createBrandModal.show}
        onHide={() => modal.createBrandModal.setShow(false)}
      />
      <CreateCatalog
        show={modal.createCatalogModal.show}
        onHide={() => modal.createCatalogModal.setShow(false)}
      />
      <CreateProperty
        show={modal.createPropertyModal.show}
        onHide={() => modal.createPropertyModal.setShow(false)}
      />
      <AddProperty
        show={modal.addPropertyModal.show}
        onHide={() => {
          modal.addPropertyModal.setShow(false);
          modal.addPropertyModal.setCatalogId(null);
        }}
        catalogId={modal.addPropertyModal.catalogId}
      />
    </Container>
  );
});

export default NewAdminPage;
