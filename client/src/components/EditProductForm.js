import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Context } from "..";
import {
  editProduct,
  fetchProducts,
  fetchOneProduct,
  removeProduct,
  editColor,
} from "../http/productApi";
import { imagesUrl } from "../utils/constants";
import ChooseProduct from "./ChooseProduct";
import ColorList from "./ColorList";
import CreateColor from "./CreateColor";

const EditProductForm = () => {
  const { productStore, brandStore, catalogStore } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedCatalog, setSelectedCatalog] = useState({});
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    brandStore.setSelectedBrand({});
    catalogStore.setSelectedCatalog({});
    productStore.setSelectedProduct({});
  }, []);

  useEffect(() => {
    Object.keys(productStore.selectedProduct).length &&
      fetchOneProduct(productStore.selectedProduct.id).then((data) => {
        setName(data.name);
        setPrice(data.price);
        setOldPrice(data.oldPrice);
        setSelectedCatalog(data.catalogId);
        setSelectedBrand(data.brandId);
        selectedColor.id
          ? setSelectedColor(
              data.colors.filter((color) => color.id === selectedColor.id)[0]
            )
          : setSelectedColor(data.colors[0]);

        if (data.properties.length) {
          const newInfo = data.properties.reduce((result, current) => {
            return [
              ...result,
              {
                id: current.id,
                name: current.name,
                type: current.type,
                currency: current.currency,
                value:
                  current.type === "number"
                    ? current.ProductProperty.value
                    : current.ProductProperty.description,
              },
            ];
          }, []);

          setProperties(newInfo);
        } else {
          setProperties([]);
        }
      });
  }, [productStore.selectedProduct]);

  const changeProperty = (id, value) => {
    if (productStore.errors.properties && productStore.errors.properties[id]) {
      productStore.removePropertyErrors(id);
    }
    setProperties(
      properties.map((property) =>
        property.id === id ? { ...property, value: value } : property
      )
    );
  };

  const handleChooseColor = (color) => {
    setSelectedColor(color);
  };

  const selectFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = async () => {
      const formData = new FormData();

      formData.append("img", file);
      await editColor(selectedColor.id, formData);
      await fetchOneProduct(productStore.selectedProduct.id).then((data) =>
        productStore.setSelectedProduct(data)
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChangeCount = (value) => {
    if (productStore.errors.count) {
      productStore.removeFieldErrors("count");
    }
    if (value < 0 || !value) {
      setSelectedColor({ ...selectedColor, count: 0 });
    } else if (value > 1000) {
      setSelectedColor({ ...selectedColor, count: 1000 });
    } else {
      setSelectedColor({ ...selectedColor, count: value });
    }
  };

  const handleChangeColor = (value) => {
    if (productStore.errors.color) {
      productStore.removeFieldErrors("color");
    }
    setSelectedColor({ ...selectedColor, name: value });
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

    setSelectedCatalog(id);

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

    setSelectedBrand(id);
  };

  const handleEditProduct = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("oldPrice", oldPrice);
    formData.append("color", JSON.stringify(selectedColor));
    formData.append("catalogId", selectedCatalog);
    formData.append("brandId", selectedBrand);
    formData.append("properties", JSON.stringify(properties));

    editProduct(productStore.selectedProduct.id, formData).then((data) => {
      if (data.errors) {
        productStore.setErrors(data.errors);
      } else {
        (async () =>
          fetchOneProduct(productStore.selectedProduct.id).then((data) => {
            productStore.setSelectedProduct(data);
          }))();
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
      setPrice(null);
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
      setOldPrice(null);
    } else if (value > 1000) {
      setOldPrice(1000);
    } else {
      setOldPrice(value);
    }
  };
  console.log(selectedColor);
  const handleRemoveProduct = async () => {
    await removeProduct(productStore.selectedProduct.id);

    await fetchProducts().then((data) => productStore.setProducts(data.rows));
    productStore.setSelectedProduct({});
  };

  return (
    <div>
      <Form>
        <h2>Редактирование товара</h2>
        <ChooseProduct product={productStore} />
        {Object.keys(productStore.selectedProduct).length ? (
          <div>
            <Row>
              <Col
                md={3}
                className="pt-2"
                style={{ position: "relative", height: "100%" }}
              >
                <Image
                  rounded
                  src={`${imagesUrl}/${
                    selectedColor ? selectedColor.img : "no-image.jpg"
                  }`}
                  style={{
                    width: "100%",
                  }}
                />
                <Row className="mx-0 mt-1">
                  <Form.Control
                    type="file"
                    style={{
                      opacity: "0",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    onChange={selectFile}
                  />
                </Row>
              </Col>
              <Col md={9}>
                <Form.Group as={Row} className="d-flex align-items-center">
                  <Form.Label column md={2}>
                    Название товара:{" "}
                  </Form.Label>
                  <Col md={10}>
                    <Form.Control
                      catalog="text"
                      value={name}
                      isInvalid={
                        productStore.errors.name && productStore.errors.name
                      }
                      placeholder="Введите название товара"
                      onChange={(e) => handleChangeName(e.target.value)}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                      {productStore.errors.name &&
                        productStore.errors.name.message}
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
                      step="0.1"
                      value={price}
                      isInvalid={
                        productStore.errors.price && productStore.errors.price
                      }
                      placeholder="Введите цену товара"
                      onChange={(e) => handleChangePrice(e.target.value)}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                      {productStore.errors.price &&
                        productStore.errors.price.message}
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
                      step="0.1"
                      value={oldPrice}
                      isInvalid={
                        productStore.errors.oldPrice &&
                        productStore.errors.oldPrice
                      }
                      placeholder="Введите цену товара"
                      onChange={(e) => handleChangeOldPrice(e.target.value)}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                      {productStore.errors.oldPrice &&
                        productStore.errors.oldPrice.message}
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
                      value={selectedColor.name || ""}
                      isInvalid={
                        productStore.errors.color && productStore.errors.color
                      }
                      placeholder="Введите код цвета"
                      onChange={(e) => handleChangeColor(e.target.value)}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                      {productStore.errors.color &&
                        productStore.errors.color.message}
                    </Form.Control.Feedback>
                  </Col>
                  <Form.Label className="mt-2" column md={2}>
                    Количество:
                  </Form.Label>
                  <Col md={4} className="mt-2">
                    <Form.Control
                      type="number"
                      value={selectedColor.count}
                      isInvalid={
                        productStore.errors.count && productStore.errors.count
                      }
                      placeholder="Введите количество товара данного цвета"
                      onChange={(e) => handleChangeCount(e.target.value)}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                      {productStore.errors.count &&
                        productStore.errors.count.message}
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
                      value={selectedCatalog}
                      isInvalid={productStore.errors.catalogId}
                    >
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
                      value={selectedBrand}
                      isInvalid={productStore.errors.brandId}
                    >
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
                <ColorList
                  product={productStore.selectedProduct}
                  changeColor={handleChooseColor}
                />
                <CreateColor product={productStore.selectedProduct} />
              </Col>
            </Row>
            <hr />
            <Row>
              {properties.map((property) => (
                <Row key={property.id} className="mt-3">
                  <Col md={3}>{property.name}</Col>
                  <Col md={9}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={property.type}
                        value={property.value}
                        isInvalid={
                          productStore.errors.properties &&
                          productStore.errors.properties[property.id]
                        }
                        onChange={(e) =>
                          changeProperty(property.id, e.target.value)
                        }
                        placeholder="Введите значение"
                      />
                      <InputGroup.Text id="basic-addon2">
                        {property.currency}
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback type={"invalid"}>
                      {productStore.errors.properties &&
                        productStore.errors.properties[property.id]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              ))}
            </Row>
            <hr />
            <Row>
              <Button
                variant="outline-warning"
                onClick={() => handleEditProduct()}
              >
                Изменить товар
              </Button>
              <Button
                className="mt-2"
                variant="outline-danger"
                onClick={() => handleRemoveProduct()}
              >
                Удалить товар
              </Button>
            </Row>
          </div>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

export default observer(EditProductForm);
