import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Context } from "..";
import { fetchCatalogProperties } from "../http/productApi";

const FilterBar = () => {
  const { product, filter } = useContext(Context);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    filter.setBrands([]);

    if (product.selectedCatalog.id) {
      fetchCatalogProperties(product.selectedCatalog.id).then((data) => {
        setProperties(data);
      });
    }
  }, [product.selectedCatalog]);

  const handleCheck = (brand) => {
    if (filter.brands.includes(brand)) {
      filter.setBrands(filter.brands.filter((id) => id !== brand));
    } else {
      filter.setBrands([...filter.brands, brand]);
    }
  };

  return (
    <Accordion flush defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Бренд</Accordion.Header>
        <Accordion.Body className="p-0">
          <ul className="list-group list-group-flush">
            {product.brands.map((brand) => (
              <li
                key={brand.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => handleCheck(brand.id)}
              >
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  checked={filter.brands.includes(brand.id)}
                  onChange={() => {}}
                />
                {brand.name}
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      {properties.length ? (
        <Accordion.Item eventKey="1">
          <Accordion.Header>Properties</Accordion.Header>
          <Accordion.Body className="p-0">
            <ul className="list-group list-group-flush">
              {properties.map((property) => (
                <li
                  key={property.property.id}
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log()}
                >
                  {property.property.name}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ) : (
        ""
      )}
    </Accordion>
  );
};

export default observer(FilterBar);
