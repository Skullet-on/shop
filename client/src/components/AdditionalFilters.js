import React from "react";
import { Accordion } from "react-bootstrap";
import StringFilter from "./StringFilter";
import NumberFilter from "./NumberFilter";

const AdditionalFilters = ({ properties, setFilters }) => {
  return (
    <>
      {properties.map(property => <Accordion.Item key={property.id} eventKey={property.id}>
        <Accordion.Header>{property.name}</Accordion.Header>
        <Accordion.Body className="p-0">
          {property.type === "string" && <StringFilter filter={property} setFilters={setFilters} />}
          {property.type === "number" && <NumberFilter filter={property} setFilters={setFilters} />}
        </Accordion.Body>
      </Accordion.Item>)}
    </>
  );
};

export default AdditionalFilters;
