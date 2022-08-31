import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "../index";

const BrandBar = observer(() => {
  const { productStore } = useContext(Context);

  const handleChangeBrand = (brand) => {
    if (brand.id === productStore.selectedBrand.id) {
      productStore.setSelectedBrand({});
    } else {
      productStore.setSelectedBrand(brand);
    }
  };

  return (
    <Row xs={2} md={6} className="d-flex">
      {Object.values(productStore.brands).map((brand) => (
        <Card
          key={brand.id}
          style={{ cursor: "pointer" }}
          className="p-3"
          onClick={() => handleChangeBrand(brand)}
          border={
            brand.id === productStore.selectedBrand.id ? "danger" : "dark"
          }
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
