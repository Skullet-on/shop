import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Phone, Instagram, Envelope } from "react-bootstrap-icons";
import { imagesUrl } from "../utils/constants";

const TopBar = () => {
  return (
    <Container>
      <Row style={{ height: 200 }} className="d-flex justify-content-between">
        <Col md={3}>
          <Image src={imagesUrl + "/alp.png"} style={{ height: 200 }} />
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col md={3}>
          <div className="d-flex">
            <Phone />
            <a className="ms-2" href="tel:+375293407694">
              +375 (29) 340-76-94
            </a>
          </div>
          <div className="d-flex">
            <Instagram />
            <a className="ms-2" href="https://deeplink.hoverlanding.com/lhhfjt">
              pryazhamilalpaka
            </a>
          </div>
          <div className="d-flex">
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
