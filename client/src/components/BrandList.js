import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { editBrand, fetchBrands, removeBrand } from "../http/productApi";
import BrandItem from "./BrandItem";

const BrandList = () => {
  const { product } = useContext(Context);

  const handleEditBrand = (brandId, brandName) => {
    editBrand(brandId, brandName).then(() =>
      fetchBrands().then((data) => product.setBrands(data))
    );
  };

  const handleRemoveBrand = (brandId) => {
    removeBrand(brandId).then(() =>
      fetchBrands().then((data) => product.setBrands(data))
    );
  };

  return (
    <Container className="mt-3">
      {product.brands.map((brand, index) => (
        <BrandItem
          key={brand.id}
          brand={brand}
          editBrand={handleEditBrand}
          removeBrand={handleRemoveBrand}
        />
      ))}
    </Container>
  );
};

export default observer(BrandList);
