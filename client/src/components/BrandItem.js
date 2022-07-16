import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const BrandItem = ({ brand, editBrand, removeBrand }) => {
  const [edit, setEdit] = useState(false);
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    setBrandName(brand.name);
  }, []);

  const handleEdit = (brandId, edit) => {
    if (edit) {
      editBrand(brandId, brandName);
    }

    setEdit(!edit);
  };

  return (
    <InputGroup>
      <Form.Control
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        disabled={!edit}
      />
      <Button
        variant={edit ? "outline-success" : "outline-warning"}
        onClick={() => handleEdit(brand.id, edit)}
      >
        {edit ? "Применить" : "Изменить"}
      </Button>
      <Button variant="outline-danger" onClick={() => removeBrand(brand.id)}>
        Удалить
      </Button>
    </InputGroup>
  );
};

export default BrandItem;
