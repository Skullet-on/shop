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
            <b> +375 (xx) xxx-xx-xx</b>
          </div>
          <div>
            <Instagram />
            <b> milaya-alpaca</b>
          </div>
          <div>
            <Envelope />
            <b> milaya-alpaca@gmail.com</b>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
