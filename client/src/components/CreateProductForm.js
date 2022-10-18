import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Context } from "..";
import { createProduct, fetchProducts } from "../http/productApi";
import { imagesUrl } from "../utils/constants";

const CreateProductForm = () => {
  const { productStore, brandStore, catalogStore } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [file, setFile] = useState({});
  const [properties, setProperties] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedCatalog, setSelectedCatalog] = useState({});

  useEffect(() => {
    setSelectedBrand({});
    setSelectedCatalog({});
  }, []);

  const selectFile = (e) => {
    if (productStore.errors.img) {
      productStore.removeFieldErrors("img");
    }

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
    if (
      productStore.errors.properties &&
      productStore.errors.properties[number]
    ) {
      productStore.removePropertyErrors(number);
    }
    setProperties(
      properties.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const handleChangeCatalog = (id) => {
    if (productStore.errors.catalogId) {
      productStore.removeFieldErrors("catalogId");
    }

    if (productStore.errors.properties) {
      productStore.removeFieldErrors("properties");
    }

    if (id < 0) {
      return setSelectedCatalog({});
    }

    const catalog = catalogStore.getCatalog(+id);

    setSelectedCatalog(catalog);

    const newData = catalog.properties.reduce((result, current) => {
      return [
        ...result,
        {
          number: current.id,
          description: "",
          property: current,
        },
      ];
    }, []);

    setProperties(newData);
  };

  const handleChangeBrand = (id) => {
    if (productStore.errors.brandId) {
      productStore.removeFieldErrors("brandId");
    }

    if (id < 0) {
      return setSelectedBrand({});
    }

    const brand = brandStore.getBrand(+id);

    setSelectedBrand(brand);
  };

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("oldPrice", `${oldPrice}`);
    formData.append("color", color);
    formData.append("count", `${count}`);
    formData.append("img", file.file);
    formData.append("catalogId", selectedCatalog.id);
    formData.append("brandId", selectedBrand.id);
    formData.append("properties", JSON.stringify(properties));
    await createProduct(formData).then((data) => {
      if (data.errors) {
        productStore.setErrors(data.errors);
      } else {
        setName("");
        setPrice(0);
        setOldPrice(0);
        setColor("");
        setCount(0);
        setFile({});
        setProperties([]);
        setSelectedBrand({});
        setSelectedCatalog({});
        fetchProducts().then((data) => productStore.setProducts(data.rows));
      }
    });
  };

  const handleChangeName = (value) => {
    if (productStore.errors.name) {
      productStore.removeFieldErrors("name");
    }
    setName(value);
  };

  const handleChangePrice = (value) => {
    if (productStore.errors.price) {
      productStore.removeFieldErrors("price");
    }
    if (value < 0 || !value) {
      setPrice(0);
    } else if (value > 1000) {
      setPrice(1000);
    } else {
      setPrice(value);
    }
  };

  const handleChangeOldPrice = (value) => {
    if (productStore.errors.oldPrice) {
      productStore.removeFieldErrors("oldPrice");
    }
    if (value < 0 || !value) {
      setOldPrice(0);
    } else if (value > 1000) {
      setOldPrice(1000);
    } else {
      setOldPrice(value);
    }
  };

  const handleChangeCount = (value) => {
    if (productStore.errors.count) {
      productStore.removeFieldErrors("count");
    }
    if (value < 0 || !value) {
      setCount(0);
    } else if (value > 1000) {
      setCount(1000);
    } else {
      setCount(value);
    }
  };

  const handleChangeColor = (value) => {
    if (productStore.errors.color) {
      productStore.removeFieldErrors("color");
    }
    setColor(value);
  };

  return (
    <Form>
      <h2>Добавление товара</h2>
      <Row>
        <Col md={3} className="pt-2" style={{ position: "relative" }}>
          <Image
            src={file.preview || imagesUrl + "/no-image.jpg"}
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
            isInvalid={productStore.errors.img && productStore.errors.img}
            onChange={selectFile}
          />
          <Form.Control.Feedback type={"invalid"}>
            {productStore.errors.img && productStore.errors.img.message}
          </Form.Control.Feedback>
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
                isInvalid={productStore.errors.name && productStore.errors.name}
                placeholder="Введите название товара"
                onChange={(e) => handleChangeName(e.target.value)}
              />
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.name && productStore.errors.name.message}
              </Form.Control.Feedback>
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
                isInvalid={
                  productStore.errors.price && productStore.errors.price
                }
                placeholder="Введите цену товара"
                onChange={(e) => handleChangePrice(e.target.value)}
              />
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.price && productStore.errors.price.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Старая цена:{" "}
            </Form.Label>
            <Col md={10} className="mt-2">
              <Form.Control
                type="number"
                value={oldPrice}
                isInvalid={
                  productStore.errors.oldPrice && productStore.errors.oldPrice
                }
                placeholder="Введите старую цену товара"
                onChange={(e) => handleChangeOldPrice(e.target.value)}
              />
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.price && productStore.errors.price.message}
              </Form.Control.Feedback>
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
                isInvalid={
                  productStore.errors.color && productStore.errors.color
                }
                placeholder="Введите код цвета"
                onChange={(e) => handleChangeColor(e.target.value)}
              />
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.color && productStore.errors.color.message}
              </Form.Control.Feedback>
            </Col>
            <Form.Label className="mt-2" column md={2}>
              Количество:
            </Form.Label>
            <Col md={4} className="mt-2">
              <Form.Control
                type="number"
                value={count}
                isInvalid={
                  productStore.errors.count && productStore.errors.count
                }
                placeholder="Введите количество товара данного цвета"
                onChange={(e) => handleChangeCount(e.target.value)}
              />
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.count && productStore.errors.count.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Выберите каталог:{" "}
            </Form.Label>
            <Col md={4}>
              <Form.Select
                onChange={(e) => handleChangeCatalog(e.target.value)}
                value={selectedCatalog.id || -1}
                isInvalid={productStore.errors.catalogId}
              >
                <option value={-1}>Выберите каталог</option>
                {catalogStore.catalogs.map((catalog) => {
                  return (
                    <option key={catalog.id} value={catalog.id}>
                      {catalog.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.catalogId &&
                  productStore.errors.catalogId.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-center">
            <Form.Label column md={2}>
              Выберите бренд:{" "}
            </Form.Label>
            <Col md={4}>
              <Form.Select
                onChange={(e) => handleChangeBrand(e.target.value)}
                value={selectedBrand.id || -1}
                isInvalid={productStore.errors.brandId}
              >
                <option value={-1}>Выберите бренд</option>
                {brandStore.brands.map((brand) => {
                  return (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.brandId &&
                  productStore.errors.brandId.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Параметры</h2>
        {properties.map((i) => (
          <Row key={i.number} className="mt-3">
            <Col md={3}>
              <Form.Label column md={3}>
                {i.property.name}:
              </Form.Label>
            </Col>
            <Col md={9}>
              <InputGroup className="mb-3">
                <Form.Control
                  type={i.property.type}
                  value={i.description}
                  isInvalid={
                    productStore.errors.properties &&
                    productStore.errors.properties[i.number]
                  }
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите значение"
                />
                <InputGroup.Text id="basic-addon2">
                  {i.property.currency}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type={"invalid"}>
                {productStore.errors.properties &&
                  productStore.errors.properties[i.number]}
              </Form.Control.Feedback>
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
