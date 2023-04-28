import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Context } from "..";
import OrderItem from "../components/OrderItem";
import { fetchOrders, finishOrder } from "../http/productApi";

const Orders = () => {
  const { orderStore } = useContext(Context);

  useEffect(() => {
    fetchOrders().then((data) => orderStore.setItems(data));
  }, []);

  const doneOrder = (id) => {
    finishOrder(id).then((data) => {
      fetchOrders().then((data) => orderStore.setItems(data));
    });
  };

  return (
    <Container className="mt-3">
      {orderStore.items.length ? (
        <Table striped>
          <thead>
            <tr>
              <th colSpan={2}>Товар</th>
              <th>Тип доставки</th>
              <th>Контактные данные</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orderStore.items.map((order) => {
              return (
                <OrderItem key={order.id} order={order} doneOrder={doneOrder} />
              );
            })}
          </tbody>
        </Table>
      ) : (
        "Заказов нет"
      )}
    </Container>
  );
};

export default observer(Orders);
