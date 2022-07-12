import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "../index";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { fetchCatalogs, fetchBrands, fetchProducts } from "../http/productApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { product, filter } = useContext(Context);

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, product.page, product.limit, filter).then(
      (data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      }
    );
    product.setSelectedBrand({});
    product.setSelectedCatalog({});
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedCatalog.id,
      product.selectedBrand.id,
      product.page,
      product.limit,
      filter
    ).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product.page, product.selectedCatalog, product.selectedBrand]);

  const handleFilter = () => {
    fetchProducts(
      product.selectedCatalog.id,
      product.selectedBrand.id,
      product.page,
      product.limit,
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
          <Button onClick={handleFilter}>Применить фильтр</Button>
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
