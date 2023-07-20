import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Accordion, Form, InputGroup } from "react-bootstrap";
import { Context } from "..";

const FilterBar = () => {
  const { brandStore, catalogStore, filterStore } = useContext(Context);

  useEffect(() => {
    filterStore.clearFilters();
  }, [catalogStore.selectedCatalog]);

  const handleCheck = (brand) => {
    if (filterStore.filters.brands) {
      if (filterStore.filters.brands.includes(brand)) {
        filterStore.setFilters(
          "brands",
          filterStore.filters.brands.filter((id) => id !== brand)
        );
      } else {
        filterStore.setFilters("brands", [
          ...filterStore.filters.brands,
          brand,
        ]);
      }
    } else {
      filterStore.setFilters("brands", [brand]);
    }
  };
  //const currentCatalog = catalogStore.catalogs.filter((catalog) => catalog.name === catalogStore.selectedCatalog.name)[0];

  const handleSetFilter = ({ name, value }) => {
    filterStore.setFilters(name, value);
  };

  return (
    <Accordion flush defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Бренд</Accordion.Header>
        <Accordion.Body className="p-0">
          <ul className="list-group list-group-flush">
            {brandStore.brands.map((brand) => (
              <li
                key={brand.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => handleCheck(brand.id)}
              >
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={
                    filterStore.filters &&
                    filterStore.filters.brands &&
                    filterStore.filters.brands.includes(brand.id)
                  }
                  onChange={() => {}}
                />
                {brand.label}
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Цена</Accordion.Header>
        <Accordion.Body className="p-0">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">От</InputGroup.Text>
            <Form.Control
              placeholder="Цена"
              type="number"
              onChange={(e) =>
                handleSetFilter({ name: "priceFrom", value: e.target.value })
              }
            />
            <InputGroup.Text id="basic-addon2">руб.</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">До</InputGroup.Text>
            <Form.Control
              placeholder="Цена"
              type="number"
              onChange={(e) =>
                handleSetFilter({ name: "priceTo", value: e.target.value })
              }
            />
            <InputGroup.Text id="basic-addon3">руб.</InputGroup.Text>
          </InputGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default observer(FilterBar);
