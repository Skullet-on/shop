import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Context } from "../index";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { fetchCatalogs, fetchBrands, fetchProducts } from "../http/productApi";
import Pages from "../components/Pages";
import { debounce, ucFirst } from "../helpers";

const Shop = observer(() => {
  const { productStore, brandStore, catalogStore, filterStore } = useContext(
    Context
  );
  useEffect(() => {
    fetchCatalogs().then((data) => {
      catalogStore.setCatalogs(data);
      catalogStore.setSelectedCatalog(data[0] || {});
    });
    fetchBrands().then((data) => brandStore.setBrands(data));
    fetchProducts(
      null,
      null,
      productStore.page,
      productStore.limit,
      filterStore.filters
    ).then((data) => {
      productStore.setProducts(data.rows);
      productStore.setTotalCount(data.count);
    });
    brandStore.setSelectedBrand({});
  }, []);

  useEffect(() => {
    fetchProducts(
      catalogStore.selectedCatalog.id,
      brandStore.selectedBrand.id,
      productStore.page,
      productStore.limit,
      productStore.search,
      filterStore.filters
    ).then((data) => {
      productStore.setProducts(data.rows);
      productStore.setTotalCount(data.count);
    });
  }, [
    productStore.page,
    catalogStore.selectedCatalog,
    brandStore.selectedBrand,
    productStore.search,
  ]);

  const handleFilter = () => {
    fetchProducts(
      catalogStore.selectedCatalog.id,
      brandStore.selectedBrand.id,
      productStore.page,
      productStore.limit,
      productStore.search,
      filterStore.filters
    ).then((data) => {
      productStore.setProducts(data.rows);
      productStore.setTotalCount(data.count);
    });
  };

  const handleSearch = debounce((value) => {
    productStore.setSearch(value);
  }, 300);

  return (
    <Container>
      <Row className="mt-2">
        <Form className="d-flex" style={{ width: "100%" }}>
          <Form.Control
            type="search"
            placeholder="Поиск"
            className="me-2"
            aria-label="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Form>
      </Row>
      <Row className="mt-2">
        <Col md={3}>
          <FilterBar />
          <Row className="p-3">
            <Button
              className="mt-2"
              variant="outline-primary"
              onClick={handleFilter}
            >
              Применить фильтр
            </Button>
          </Row>
        </Col>
        <Col md={9}>
          <h1>
            {(catalogStore.selectedCatalog.name &&
              ucFirst(catalogStore.selectedCatalog.name)) ||
              "Каталог"}
          </h1>
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
