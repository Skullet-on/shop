import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CreateColorModal from "./modals/CreateColorModal";

const CreateColor = ({ product }) => {
  const [colorVisible, setColorVisible] = useState(false);

  return (
    <>
      <Button
        className="mt-2"
        variant="outline-dark"
        style={{ cursor: "pointer" }}
        onClick={() => setColorVisible(true)}
      >
        Добавить цвет
      </Button>

      <CreateColorModal
        show={colorVisible}
        onHide={() => setColorVisible(false)}
        productId={product.id}
      />
    </>
  );
};

export default CreateColor;
