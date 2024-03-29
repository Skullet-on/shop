import React from "react";
import { Container } from "react-bootstrap";
import { address } from "../utils/constants";

const PaidAndDelivery = () => {
  return (
    <Container>
      <h1>Доставка и оплата</h1>
      <hr />
      <h1>Способы оплаты:</h1>
      <h3>1). Наличными</h3>
      <p>
        при получении товара у курьера либо самовывозом из магазина по адресу:
      </p>
      <p>
        <b>{address}</b>
      </p>
      <hr />
      <h1>Способы доставки:</h1>
      <h3>1). Самовывоз</h3>
      <p>
        Товар вы можете получить, предварительно согласовав это с представителем
        магазина, по адресу:
      </p>
      <p>
        <b>{address}</b>
      </p>
      <h3>2). Курьером</h3>
      <p>
        Доставка по г. Минску в пределах МКАД - 5 бел.руб. При сумме заказа 80
        бел.руб и более - доставка бесплатно.
      </p>
      <p>
        <b>Доставка курьером производится ежедневно с 10.00 до 22.00.</b>
      </p>
      <h3>3). Европочта</h3>
      <p>
        Отправляем в любое отделение Европочта на территории РБ
      </p>
      <p>
        <b>Посылки доходят в срок от 5 до 20 дней, но в среднем 10 дней.</b>
      </p>
    </Container>
  );
};

export default PaidAndDelivery;
