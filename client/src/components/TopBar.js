import React from "react";
import { Container, Image } from "react-bootstrap";
import { Phone, Instagram, Envelope } from "react-bootstrap-icons";
import { imagesUrl } from "../utils/constants";

const TopBar = () => {
  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Image src={imagesUrl + "/alp.png"} style={{ height: 200 }} />
      </div>
      <div>
      </div>
      <div className="topBar_contacts">
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
      </div>
    </Container>
  );
};

export default TopBar;
