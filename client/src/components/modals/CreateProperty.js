import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createProperty } from '../../http/productApi';

const CreateProperty = ({show, onHide}) => {
  const [value, setValue] = useState('');

  const addProperty = () => {
    createProperty({name: value}).then(data =>{
      setValue('')
      onHide()
    })
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить свойство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Введите название свойства'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProperty}>Добавить</Button>
        <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateProperty
