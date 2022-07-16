import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { createProduct, fetchBrands, fetchProducts, fetchTypes } from '../../http/productApi';
import { Context } from '../../index'

const CreateProduct = observer(({show, onHide}) => {
  const { product, toast } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data));
    fetchBrands().then(data => product.setBrands(data));
    fetchProducts().then(data => product.setProducts(data.rows));
  }, [])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }
  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addProduct = () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('typeId',  product.selectedType.id);
    formData.append('brandId', product.selectedBrand.id);
    formData.append('info', JSON.stringify(info));
    createProduct(formData).then(data => onHide())

    toast.setMessage(`Продукт успешно добавлен`);
    toast.setVariant("info");
    toast.setShow(true);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить продукт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{product.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.types.map(type => 
                <Dropdown.Item 
                  key={type.id} 
                  onClick={() => product.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{product.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map(brand => 
                <Dropdown.Item 
                  key={brand.id} 
                  onClick={() => product.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
            type="text"
          />
          <Form.Control
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={selectFile}
          />
          <hr />
          <Button
            variant='outline-dark'
            onClick={addInfo}
          >
            Добавить характеристику
          </Button>
          {
            info.map(i => 
              <Row key={i.number} className='mt-3'>
                <Col md={4}>
                  <Form.Control
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    placeholder='Введите название свойства'
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                    placeholder='Введите описане свойства'
                  />
                </Col>
                <Col md={4}>
                  <Button 
                    variant='outline-danger'
                    onClick={() => removeInfo(i.number)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            )
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
        <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateProduct