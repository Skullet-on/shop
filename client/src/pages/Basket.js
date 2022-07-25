import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { Context } from "..";
import BasketItem from "../components/BasketItem";

const Basket = () => {
  const { basket } = useContext(Context);

  return (
    <Container className="mt-3">
      <Table striped bordered hover>
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
          {basket.items.map((item) => {
            return <BasketItem key={item.id} item={item} basket={basket} />;
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td>
              <b>{basket.totalSum} руб.</b>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

export default observer(Basket);
