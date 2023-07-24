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
        {products.map((product, index) => {
          return order.isDone ? (
            <s key={index}>{`${index + 1}. ${product.name}, ${product.price} руб., ${product.count} шт., цвет: ${product.color.name}`}</s>
          ) : (
            <p
              key={index}
            >{`${index + 1}. ${product.name}, ${product.price} руб., ${product.count} шт., цвет: ${product.color.name}`}</p>
          );
        })}
      </td>
      <td>
        {order.isDone ? (
          <s>
            {order.deliveryType === "pickupCheck"
              ? "Самовывоз"
              : order.deliveryType === "deliveryCheck"
              ? "Доставка"
              : "Европочта"}
          </s>
        ) : (
          <p>
            {order.deliveryType === "pickupCheck"
              ? "Самовывоз"
              : order.deliveryType === "deliveryCheck"
              ? "Доставка"
              : "Европочта"}
          </p>
        )}
      </td>
      <td>
        {order.isDone ? (
          <>
            <s>{order.fio}</s>
            <s>{order.phone}</s>
            <s>{`г. ${order.city}, ул. ${order.street}, д. ${order.building}/${order.corp}, кв. ${order.flat}`}</s>
            {order.deliveryType === "postCheck" && (
              <s>Европочта: {order.postoffice}</s>
            )}
          </>
        ) : (
          <>
            <p>{order.fio}</p>
            <p>{order.phone}</p>
            <p>{`г. ${order.city}, ул. ${order.street}, д. ${order.building}/${order.corp}, кв. ${order.flat}`}</p>
            {order.deliveryType === "postCheck" && (
              <p>Европочта: {order.postoffice}</p>
            )}
          </>
        )}
      </td>
      <td>{order.isDone ? <s>{totalSum} руб.</s> : <p>{totalSum} руб.</p>}</td>
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
