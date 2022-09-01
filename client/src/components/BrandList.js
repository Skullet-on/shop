import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { fetchBrands, removeBrand } from "../http/productApi";
import BrandItem from "./BrandItem";

const BrandList = () => {
  const { brandStore } = useContext(Context);

  const handleRemoveBrand = (brandId) => {
    removeBrand(brandId).then(() =>
      fetchBrands().then((data) => brandStore.setBrands(data))
    );
  };

  return (
    <Container className="mt-3">
      {brandStore.brands.map((brand, index) => (
        <BrandItem
          key={brand.id}
          brand={brand}
          removeBrand={handleRemoveBrand}
        />
      ))}
    </Container>
  );
};

export default observer(BrandList);
