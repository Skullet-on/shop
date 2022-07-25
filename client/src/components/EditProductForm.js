import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Image, Row } from "react-bootstrap";
import { Context } from "..";
import {
  editProduct,
  fetchBrands,
  fetchProducts,
  fetchCatalogs,
  fetchProperties,
  fetchOneProduct,
  removeProduct,
  editColor,
} from "../http/productApi";
import ChooseProduct from "./ChooseProduct";
import ColorList from "./ColorList";
import CreateColor from "./CreateColor";

const EditProductForm = () => {
  const { product } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [info, setInfo] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    fetchCatalogs().then((data) => product.setCatalogs(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts().then((data) => product.setProducts(data.rows));
    fetchProperties().then((data) => product.setProperties(data));
    product.setSelectedBrand({});
    product.setSelectedCatalog({});
    product.setSelectedProduct({});
  }, []);

  useEffect(() => {
    Object.keys(product.selectedProduct).length &&
      fetchOneProduct(product.selectedProduct.id).then((data) => {
        setName(data.name);
        setPrice(data.price);
        if (data.info.length) {
          const newInfo = data.info.reduce((result, current) => {
            return [
              ...result,
              {
                number: current.id,
                description: current.description,
                property: product.getProperty(current.propertyId),
              },
            ];
          }, []);

          setInfo(newInfo);
        } else {
          setInfo([]);
        }
        setSelectedColor(product.selectedProduct.color[0]);
        product.setSelectedBrand(product.getBrand(data.brandId));
        product.setSelectedCatalog(product.getCatalog(data.catalogId));
      });
  }, [product.selectedProduct]);

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
      await fetchOneProduct(product.selectedProduct.id).then((data) =>
        product.setSelectedProduct(data)
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("catalogId", product.selectedCatalog.id);
    formData.append("brandId", product.selectedBrand.id);
    formData.append("info", JSON.stringify(info));
    editProduct(product.selectedProduct.id, formData).then((data) => {});
  };

  const handleRemoveProduct = async () => {
    await removeProduct(product.selectedProduct.id);

    await fetchProducts().then((data) => product.setProducts(data.rows));
    product.setSelectedProduct({});
  };

  return (
    <div>
      <Form>
        <h2>Редактирование товара</h2>
        <ChooseProduct product={product} />
        {Object.keys(product.selectedProduct).length ? (
          <div>
            <Row>
              <Col
                md={3}
                className="pt-2"
                style={{ position: "relative", height: "100%" }}
              >
                <Image
                  rounded
                  src={`${process.env.REACT_APP_API_URL}/${
                    selectedColor ? selectedColor.img : "no-image.jpg"
                  }`}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    aspectRatio: "16 / 9",
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
                      catalog="number"
                      value={price}
                      placeholder="Введите цену товара"
                      onChange={(e) => setPrice(e.target.value)}
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
                        {product.selectedCatalog.name || "Выберите каталог"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {product.catalogs.map((catalog) => (
                          <Dropdown.Item
                            key={catalog.id}
                            onClick={() => product.setSelectedCatalog(catalog)}
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
                <ColorList
                  product={product.selectedProduct}
                  changeColor={handleChooseColor}
                />
                <CreateColor product={product.selectedProduct} />
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
                            onClick={() =>
                              changeInfo("property", property, i.number)
                            }
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
