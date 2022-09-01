import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Context } from "..";
import { editBrand, fetchBrands } from "../http/productApi";

const BrandItem = ({ brand, removeBrand }) => {
  const { brandStore } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    setBrandName(brand.label);
  }, []);

  const handleEdit = (brandId, edit) => {
    if (edit) {
      editBrand(brandId, brandName).then((data) => {
        if (data.errors) {
          brandStore.setBrandErrors(brandId, data.errors);
        } else {
          fetchBrands().then((data) => {
            brandStore.setBrands(data);
          });
          setEdit(!edit);
        }
      });
    } else {
      setEdit(!edit);
    }
  };

  const handleChangeBrand = (value, brandId) => {
    setBrandName(value);
    brandStore.setBrandErrors(brandId, undefined);
  };

  return (
    <InputGroup>
      <Form.Control
        value={brandName}
        isInvalid={brand.errors}
        onChange={(e) => handleChangeBrand(e.target.value, brand.id)}
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
      <Form.Control.Feedback type={"invalid"}>
        {brand.errors && brand.errors.name.message}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default observer(BrandItem);
