import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const StringFilter = ({ filter, setFilters }) => {
  return (
    <>
      {filter.currency ? <InputGroup className="mb-3">
        <Form.Control
          placeholder={filter.name}
          onChange={e => setFilters(filter.name, e.target.value)}
        />
        <InputGroup.Text id="stringFilterWithCurrency">{filter.currency}</InputGroup.Text>
      </InputGroup> : <Form.Control
          placeholder={filter.name}
          onChange={e => setFilters({ name: filter.name, value: e.target.value })}
        />}
    </>
  );
};

export default StringFilter;
