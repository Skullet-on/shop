import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Context } from "..";

const ChooseProduct = () => {
  const { product } = useContext(Context);

  return (
    <Dropdown className="mt-2 mb-2">
      <Dropdown.Toggle>
        {product.selectedProduct.name || "Выберите продукт"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {product.products.map((prod) => (
          <Dropdown.Item
            key={prod.id}
            onClick={() => product.setSelectedProduct(prod)}
          >
            {prod.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default observer(ChooseProduct);
