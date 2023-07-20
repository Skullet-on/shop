import React from "react";
import { Card } from "react-bootstrap";
import { imagesUrl } from "../utils/constants";

const ColorItem = ({ color }) => {
  return (
    <Card className="p-0">
      <Card.Img
        style={{ height: 25, width: 25 }}
        variant="top"
        src={imagesUrl + "/" + color.img}
      />
    </Card>
  );
};

export default ColorItem;
