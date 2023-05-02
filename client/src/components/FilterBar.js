import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Context } from "..";
import AdditionalFilters from "./AdditionalFilters";

const FilterBar = () => {
  const { brandStore, catalogStore, filterStore } = useContext(Context);

  useEffect(() => {
    filterStore.clearFilters();
  }, [catalogStore.selectedCatalog]);

  const handleCheck = (brand) => {
    if (filterStore.filters.brands) {
      if (filterStore.filters.brands.includes(brand)) {
        filterStore.setFilters('brands', filterStore.filters.brands.filter((id) => id !== brand));
      } else {
        filterStore.setFilters('brands', [...filterStore.filters.brands, brand]);
      }
    } else {
      filterStore.setFilters('brands', [brand]);
    }
  };
  const currentCatalog = catalogStore.catalogs.filter((catalog) => catalog.name === catalogStore.selectedCatalog.name)[0];

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
                  checked={filterStore.filters && filterStore.filters.brands && filterStore.filters.brands.includes(brand.id)}
                  onChange={() => {}}
                />
                {brand.label}
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      {currentCatalog && currentCatalog.properties && <AdditionalFilters properties={currentCatalog.properties} setFilters={(e) => handleSetFilter(e)} />}
    </Accordion>
  );
};

export default observer(FilterBar);
