import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CreateColorModal from "./modals/CreateColorModal";
import { deleteColor } from "../http/productApi";
import { useNavigate } from "react-router-dom";

const CreateColor = ({ product, color }) => {
  const [colorVisible, setColorVisible] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const navigate = useNavigate()

  const handleDeleteColor = async (id) => {
    setDisableButtons(true);
    const deletedColor = await deleteColor(id)
    if (deletedColor === 1) {
      setDisableButtons(false);
      navigate(0);
    } else {
      setDisableButtons(false);
    }
  }

  return (
    <>
      <Button
        className="mt-2"
        disabled={disableButtons}
        variant="outline-dark"
        style={{ cursor: "pointer" }}
        onClick={() => setColorVisible(true)}
      >
        Добавить цвет
      </Button>

      <Button
        className="mt-2 ms-2"
        disabled={disableButtons}
        variant="outline-danger"
        style={{ cursor: "pointer" }}
        onClick={() => handleDeleteColor(color.id, color.productId)}
      >
        Удалить цвет
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
