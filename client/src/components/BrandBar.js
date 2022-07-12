import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "../index";

const BrandBar = observer(() => {
  const { product } = useContext(Context);

  const handleChangeBrand = (brand) => {
    if (brand.id === product.selectedBrand.id) {
      product.setSelectedBrand({});
    } else {
      product.setSelectedBrand(brand);
    }
  };

  return (
    <Row xs={2} md={6} className="d-flex">
      {Object.values(product.brands).map((brand) => (
        <Card
          key={brand.id}
          style={{ cursor: "pointer" }}
          className="p-3"
          onClick={() => handleChangeBrand(brand)}
          border={brand.id === product.selectedBrand.id ? "danger" : "dark"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
