import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const NumberFilter = ({ filter }) => {
  return (
    <>
      {filter.currency ? <>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">От</InputGroup.Text>
          <Form.Control
            placeholder={filter.name}
          />
          <InputGroup.Text id="basic-addon2">{filter.currency}</InputGroup.Text>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">До</InputGroup.Text>
          <Form.Control
            placeholder={filter.name}
          />
          <InputGroup.Text id="basic-addon2">{filter.currency}</InputGroup.Text>
        </InputGroup>
      </> : <Form.Control
        placeholder={filter.name}
      />}
    </>
  );
};

export default NumberFilter;
