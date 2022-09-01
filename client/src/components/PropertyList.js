import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { fetchProperties, removeProperty } from "../http/productApi";
import PropertyItem from "./PropertyItem";

const PropertyList = () => {
  const { propertiesStore } = useContext(Context);

  const handleRemoveProperty = (propertyId) => {
    removeProperty(propertyId).then(() =>
      fetchProperties().then((data) => propertiesStore.setProperties(data))
    );
  };

  return (
    <Container>
      {propertiesStore.properties.map((property, index) => (
        <PropertyItem
          key={index}
          property={property}
          removeProperty={handleRemoveProperty}
        />
      ))}
    </Container>
  );
};

export default observer(PropertyList);
