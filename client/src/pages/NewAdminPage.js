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

const NewAdminPage = observer(() => {
  const { product } = useContext(Context);

  const [brandVisible, setBrandVisible] = useState(false);
  const [catalogVisible, setCatalogVisible] = useState(false);
  const [propertyVisible, setPropertyVisible] = useState(false);

  const [tab, setTab] = useState("create");

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts().then((data) => product.setProducts(data.rows));
    fetchProperties().then((data) => product.setProperties(data));
  }, []);

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProperties().then((data) => product.setProperties(data));
  }, [brandVisible, catalogVisible, propertyVisible]);

  return (
    <Container className="mt-3">
      <Button variant="outline-dark" onClick={() => setCatalogVisible(true)}>
        Добавить каталог
      </Button>
      <Button variant="outline-dark" onClick={() => setBrandVisible(true)}>
        Добавить бренд
      </Button>
      <Button variant="outline-dark" onClick={() => setPropertyVisible(true)}>
        Добавить свойство товара
      </Button>

      <Tabs
        defaultActiveKey="profile"
        activeKey={tab}
        onSelect={(t) => setTab(t)}
        className="mb-3 mt-3"
      >
        <Tab eventKey="create" title="Добавить товар">
          <CreateProductForm />
        </Tab>
        <Tab eventKey="edit" title="Редактировать товар">
          <EditProductForm />
        </Tab>
      </Tabs>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateCatalog
        show={catalogVisible}
        onHide={() => setCatalogVisible(false)}
      />
      <CreateProperty
        show={propertyVisible}
        onHide={() => setPropertyVisible(false)}
      />
    </Container>
  );
});

export default NewAdminPage;
