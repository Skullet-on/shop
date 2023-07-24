import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import BasketItem from "../components/BasketItem";
import OrderForm from "../components/OrderForm";
import { addOrder } from "../http/productApi";
import { LS_BASKET, SHOP_ROUTE } from "../utils/constants";

const Basket = () => {
  const { basketStore, toastStore } = useContext(Context);
  const [deliveryType, setDeliveryType] = useState("deliveryCheck");
  const navigate = useNavigate();

  const handleSubmitForm = (
    e,
    { fio, phone, description, city, street, building, corp, flat, postoffice }
  ) => {
    e.preventDefault();
    let products = [];
    basketStore.items.map((product) => {
      return products.push({
        productId: product.product.id,
        colorId: product.color.id,
        price: product.product.price,
        count: product.count,
      });
    });

    return addOrder({
      fio,
      phone,
      description,
      city,
      street,
      building,
      corp,
      flat,
      postoffice,
      deliveryType,
      products,
    })
      .then((data) => {
        if (data.errors) {
          basketStore.setErrors(data.errors);
        } else {
          localStorage.removeItem(LS_BASKET);
          basketStore.setItems([]);
          navigate(SHOP_ROUTE);
          toastStore.setInfoToast("Заказ принят.");
        }
      })
      .catch((e) => {
        basketStore.setErrors(e.response.data.errors);
      });
  };

  return (
    <Container className="mt-3">
      {basketStore.items.length ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th colSpan={2}>Товар</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {basketStore.items.map((item) => {
                return (
                  <BasketItem key={item.id} item={item} basket={basketStore} />
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}></td>
                <td>
                  <b>{Number(basketStore.totalSum).toFixed(2)} руб.</b>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
          <Form>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="deliveryCheck"
                label="Доставка"
                checked={deliveryType === "deliveryCheck"}
                onChange={() => setDeliveryType("deliveryCheck")}
              />

              <Form.Check
                type="radio"
                label="Самовывоз"
                id="pickupCheck"
                checked={deliveryType === "pickupCheck"}
                onChange={() => setDeliveryType("pickupCheck")}
              />

              <Form.Check
                type="radio"
                label="Европочта"
                id="postCheck"
                checked={deliveryType === "postCheck"}
                onChange={() => setDeliveryType("postCheck")}
              />
            </div>
          </Form>

          <OrderForm
            submitForm={handleSubmitForm}
            deliveryType={deliveryType}
          />
        </>
      ) : (
        <div>Корзина пуста</div>
      )}
    </Container>
  );
};

export default observer(Basket);
