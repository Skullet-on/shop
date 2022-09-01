import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Image, Row } from "react-bootstrap";
import { Context } from "..";
import {
  createProduct,
  fetchBrands,
  fetchProducts,
  fetchCatalogs,
  fetchProperties,
  fetchCatalogProperties,
} from "../http/productApi";

const CreateProductForm = () => {
  const {
    productStore,
    brandStore,
    catalogStore,
    propertiesStore,
  } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [file, setFile] = useState({});
  const [info, setInfo] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedCatalog, setSelectedCatalog] = useState({});

  useEffect(() => {
    fetchCatalogs().then((data) => catalogStore.setCatalogs(data));
    fetchBrands().then((data) => brandStore.setBrands(data));
    fetchProducts().then((data) => productStore.setProducts(data.rows));
    fetchProperties().then((data) => propertiesStore.setProperties(data));
    setSelectedBrand({});
    setSelectedCatalog({});
  }, []);

  const selectFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        preview: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const handleChangeCatalog = async (catalog) => {
    setSelectedCatalog(catalog);

    await fetchCatalogProperties(catalog.id).then((data) => {
      if (data.length) {
        const newData = data.reduce((result, current) => {
          return [
            ...result,
            {
              number: current.id,
              description: "",
              property: current.property,
            },
          ];
        }, []);

        setInfo(newData);
      } else {
        setInfo([]);
      }
    });
  };

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("color", color);
    formData.append("count", `${count}`);
    formData.append("img", file.file);
    formData.append("catalogId", selectedCatalog.id);
    formData.append("brandId", selectedBrand.id);
    formData.append("info", JSON.stringify(info));
    await createProduct(formData).then((data) => {
      setName("");
      setPrice(0);
      setColor("");
      setCount(0);
      setFile({});
      setInfo([]);
    });

    await fetchProducts().then((data) => productStore.setProducts(data.rows));
  };

  return (
    <Form>
      <h2>Добавление товара</h2>
      <Row>
        <Col md={3} className="pt-2" style={{ position: "relative" }}>
          <Image
            src={
              file.preview || process.env.REACT_APP_API_URL + "/no-image.jpg"
            }
            style={{ width: "100%" }}
          />
          <Form.Control
            type="file"
            style={{
              opacity: "0",
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
            }}
            onChange={selectFile}
          />
        </Col>
        <Col md={9}>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Название товара:{" "}
            </Form.Label>
            <Col md={10}>
              <Form.Control
                type="text"
                value={name}
                placeholder="Введите название товара"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Цена:{" "}
            </Form.Label>
            <Col md={10} className="mt-2">
              <Form.Control
                type="number"
                value={price}
                placeholder="Введите цену товара"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label className="mt-2" column md={2}>
              Цвет:
            </Form.Label>
            <Col md={4} className="mt-2">
              <Form.Control
                type="string"
                value={color}
                placeholder="Введите код цвета"
                onChange={(e) => setColor(e.target.value)}
              />
            </Col>
            <Form.Label className="mt-2" column md={2}>
              Количество:
            </Form.Label>
            <Col md={4} className="mt-2">
              <Form.Control
                type="string"
                value={count}
                placeholder="Введите количество товара данного цвета"
                onChange={(e) => setCount(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Выберите каталог:{" "}
            </Form.Label>
            <Col md={4}>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                  {selectedCatalog.name || "Выберите каталог"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {catalogStore.catalogs.map((catalog) => (
                    <Dropdown.Item
                      key={catalog.id}
                      onClick={() => handleChangeCatalog(catalog)}
                    >
                      {catalog.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Выберите бренд:{" "}
            </Form.Label>
            <Col md={4}>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                  {selectedBrand.name || "Выберите бренд"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.values(brandStore.brands).map((brand) => (
                    <Dropdown.Item
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      {brand.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Параметры</h2>
        {info.map((i) => (
          <Row key={i.number} className="mt-3">
            <Col md={3}>
              <Form.Label column md={3}>
                {i.property.name}:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type={i.property.type}
                value={i.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, i.number)
                }
                placeholder="Введите значение"
              />
            </Col>
          </Row>
        ))}
      </Row>
      <hr />
      <Row>
        <Button variant="outline-success" onClick={addProduct}>
          Добавить товар
        </Button>
      </Row>
    </Form>
  );
};

export default observer(CreateProductForm);
