import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
  const { product } = useContext(Context);

  const handleChangeType = (type) => {
    if (type.id === product.selectedType.id) {
      product.setSelectedType({})
    } else {
      product.setSelectedType(type)
    }
  }

  return (
    <ListGroup>
      {product.types.map(type => 
        <ListGroup.Item 
          key={type.id}
          style={{ cursor: 'pointer' }}
          active={type.id === product.selectedType.id}
          onClick={() => handleChangeType(type)}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
})

export default TypeBar