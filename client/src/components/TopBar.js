import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Phone, Instagram, Envelope } from "react-bootstrap-icons";

const TopBar = () => {
  return (
    <Container>
      <Row style={{ height: 200 }} className="d-flex justify-content-between">
        <Col>
          <Image
            src={process.env.REACT_APP_API_URL + "/alpaca.png"}
            style={{ height: 200, objectFit: "cover", aspectRatio: "16 / 9" }}
          />
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div>
            <Phone />
            <a className="ms-2" href="tel:+375293407694">
              +375 (29) 340-76-94
            </a>
          </div>
          <div>
            <Instagram />
            <a className="ms-2" href="https://deeplink.hoverlanding.com/lhhfjt">
              pryazhamilalpaka
            </a>
          </div>
          <div>
            <Envelope />
            <a className="ms-2" href="mailto:skullet-on@mail.ru">
              skullet-on@mail.ru
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
