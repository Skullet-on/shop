import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Context } from "..";

const FilterBar = () => {
  const { brandStore, catalogStore, filterStore } = useContext(Context);

  useEffect(() => {
    filterStore.setBrands([]);
  }, [catalogStore.selectedCatalog]);

  const handleCheck = (brand) => {
    if (filterStore.brands.includes(brand)) {
      filterStore.setBrands(filterStore.brands.filter((id) => id !== brand));
    } else {
      filterStore.setBrands([...filterStore.brands, brand]);
    }
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
                  checked={filterStore.brands.includes(brand.id)}
                  onChange={() => {}}
                />
                {brand.name}
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default observer(FilterBar);
