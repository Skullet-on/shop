import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Context } from "..";
import { fetchProducts, fetchOrdersProduct } from "../http/productApi";

const OrderItem = ({ order, doneOrder }) => {
  const { productStore } = useContext(Context);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => productStore.setProducts(data.rows));

    fetchOrdersProduct(order.id).then((data) => {
      const a = data.reduce((acc, curr) => {
        const productById = productStore.getProduct(curr.productId);
        const colorByProduct = productStore.getProductColor(
          curr.productId,
          curr.colorId
        );

        return [
          ...acc,
          {
            name: `${productById.brand.label} ${productById.name}`,
            price: curr.price,
            count: curr.count,
            color: colorByProduct[0],
          },
        ];
      }, []);
      setProducts(a);
    });
  }, []);

  let totalSum = 0;
  products.map((product) => {
    return (totalSum = totalSum + product.price * product.count);
  });

  return (
    <tr>
      <td colSpan={2}>
        {products.map((product) => {
          return (
            <p
              key={product.name}
            >{`${product.name}, ${product.price} руб., ${product.count} шт., цвет: ${product.color.name}`}</p>
          );
        })}
      </td>
      <td>
        <p>{order.fio}</p>
        <p>{order.phone}</p>
        <p>{`г. ${order.city}, ул. ${order.street}, д. ${order.building}/${order.corp}, кв. ${order.flat}`}</p>
      </td>
      <td>{totalSum} руб.</td>
      <td>
        {order.isDone ? (
          "Выполнен"
        ) : (
          <Button onClick={() => doneOrder(order.id)}>Завершить</Button>
        )}
      </td>
    </tr>
  );
};

export default observer(OrderItem);
