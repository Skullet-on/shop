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
          <div>
            <Phone />
            <a
              className="ms-2"
              style={{ textDecoration: "auto" }}
              href="tel:+375445549041"
            >
              +375 (44) 554-90-41
            </a>
          </div>
          <div>
            <Instagram />
            <a
              className="ms-2"
              style={{ textDecoration: "auto" }}
              href="https://deeplink.hoverlanding.com/lhhfjt"
            >
              pryazhamilalpaka
            </a>
          </div>
          <div>
            <Envelope />
            <a
              className="ms-2"
              style={{ textDecoration: "auto" }}
              href="mailto:pryazhamilayaalpaka@gmail.com"
            >
              pryazhamilayaalpaka@gmail.com
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
