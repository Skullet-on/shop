import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Image, Row } from "react-bootstrap";
import { Context } from "..";
import {
  createProduct,
  fetchBrands,
  fetchProducts,
  fetchTypes,
  fetchProperties,
} from "../http/productApi";

const CreateProductForm = () => {
  const { product } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [file, setFile] = useState({});
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts().then((data) => product.setProducts(data.rows));
    fetchProperties().then((data) => product.setProperties(data));
    product.setSelectedBrand({});
    product.setSelectedType({});
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
  const addInfo = () => {
    setInfo([...info, { property: {}, description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("color", color);
    formData.append("count", `${count}`);
    formData.append("img", file.file);
    formData.append("typeId", product.selectedType.id);
    formData.append("brandId", product.selectedBrand.id);
    formData.append("info", JSON.stringify(info));
    await createProduct(formData).then((data) => {
      setName("");
      setPrice(0);
      setColor("");
      setCount(0);
      setFile({});
      setInfo([]);
    });

    await fetchProducts().then((data) => product.setProducts(data.rows));
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
                  {product.selectedType.name || "Выберите каталог"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {product.types.map((type) => (
                    <Dropdown.Item
                      key={type.id}
                      onClick={() => product.setSelectedType(type)}
                    >
                      {type.name}
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
                  {product.selectedBrand.name || "Выберите бренд"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.values(product.brands).map((brand) => (
                    <Dropdown.Item
                      key={brand.id}
                      onClick={() => product.setSelectedBrand(brand)}
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
        <Button variant="outline-dark" onClick={addInfo}>
          Добавить свойство
        </Button>
        {info.map((i) => (
          <Row key={i.number} className="mt-3">
            <Col md={3}>
              <Dropdown className=" mb-2">
                <Dropdown.Toggle>
                  {i.property.name || "Выберите свойство"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {product.properties.map((property) => (
                    <Dropdown.Item
                      key={property.id}
                      onClick={() => changeInfo("property", property, i.number)}
                    >
                      {property.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Form.Control
                value={i.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, i.number)
                }
                placeholder="Введите значение"
              />
            </Col>
            <Col md={3}>
              <Button
                variant="outline-danger"
                onClick={() => removeInfo(i.number)}
              >
                Удалить
              </Button>
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
