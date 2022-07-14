import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "../index";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { fetchCatalogs, fetchBrands, fetchProducts } from "../http/productApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { product, filter } = useContext(Context);
  useEffect(() => {
    fetchCatalogs().then((data) => {
      product.setCatalogs(data);
      product.setSelectedCatalog(data[0]);
    });
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, product.page, product.limit, filter).then(
      (data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      }
    );
    product.setSelectedBrand({});
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedCatalog.id,
      product.selectedBrand.id,
      product.page,
      product.limit,
      product.search,
      filter
    ).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [
    product.page,
    product.selectedCatalog,
    product.selectedBrand,
    product.search,
  ]);

  const handleFilter = () => {
    fetchProducts(
      product.selectedCatalog.id,
      product.selectedBrand.id,
      product.page,
      product.limit,
      product.search,
      filter
    ).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <FilterBar />
          <Row className="p-3">
            <Button className="mt-2" onClick={handleFilter}>
              Применить фильтр
            </Button>
          </Row>
        </Col>
        <Col md={9}>
          <h1>{product.selectedCatalog.name || "Каталог"}</h1>
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
