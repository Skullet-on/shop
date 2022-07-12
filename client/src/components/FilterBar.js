import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { Context } from "..";

const FilterBar = () => {
  const { filter } = useContext(Context);

  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Text>Цена</InputGroup.Text>
        <FormControl
          value={filter.minPrice || ""}
          onChange={(e) => filter.setMinPrice(e.target.value)}
          aria-label="min"
        />
        <FormControl
          value={filter.maxPrice || ""}
          onChange={(e) => filter.setMaxPrice(e.target.value)}
          aria-label="max"
        />
      </InputGroup>
    </Form>
  );
};

export default observer(FilterBar);
