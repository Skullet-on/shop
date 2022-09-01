import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Context } from "..";
import { editProperty, fetchProperties } from "../http/productApi";

const PropertyItem = ({ property, removeProperty }) => {
  const { propertiesStore } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyCurrency, setPropertyCurrency] = useState("");

  const types = [
    {
      id: 1,
      name: "Число",
      value: "number",
    },
    {
      id: 2,
      name: "Строка",
      value: "string",
    },
  ];

  useEffect(() => {
    setPropertyName(property.name);
    setPropertyCurrency(property.currency);
    setPropertyType(property.type);
  }, []);

  const handleEdit = (propertyId, edit) => {
    if (edit) {
      editProperty(propertyId, {
        name: propertyName,
        type: propertyType,
        currency: propertyCurrency,
      }).then((data) => {
        if (data.errors) {
          propertiesStore.setPropertyErrors(propertyId, data.errors);
        } else {
          fetchProperties().then((data) => {
            propertiesStore.setProperties(data);
          });
          setEdit(!edit);
        }
      });
    } else {
      setEdit(!edit);
    }
  };

  const handleChangeProperty = (value, propertyId) => {
    setPropertyName(value);
    propertiesStore.setPropertyErrors(propertyId, undefined);
  };

  const handleChangeType = (value) => {
    setPropertyType(value);
  };

  return (
    <Card className="mt-3">
      <InputGroup>
        <Form.Control
          value={propertyName}
          placeholder="Введите название свойства"
          isInvalid={property.errors}
          onChange={(e) => handleChangeProperty(e.target.value, property.id)}
          disabled={!edit}
        />
        <Form.Control
          value={propertyCurrency}
          placeholder="Введите единицу измерения"
          onChange={(e) => setPropertyCurrency(e.target.value)}
          disabled={!edit}
        />
        <Form.Select
          value={propertyType || ""}
          disabled={!edit}
          onChange={(e) => handleChangeType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.name}
            </option>
          ))}
        </Form.Select>
        <Button
          variant={edit ? "outline-success" : "outline-warning"}
          onClick={() => handleEdit(property.id, edit)}
        >
          {edit ? "Применить" : "Изменить"}
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => removeProperty(property.id)}
        >
          Удалить
        </Button>
        <Form.Control.Feedback type={"invalid"}>
          {property.errors && property.errors.name.message}
        </Form.Control.Feedback>
      </InputGroup>
    </Card>
  );
};

export default observer(PropertyItem);
