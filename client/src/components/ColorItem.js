import React from "react";
import { Card } from "react-bootstrap";

const ColorItem = ({ color }) => {
  return (
    <Card className="p-0">
      <Card.Img
        style={{ height: 25 }}
        variant="top"
        src={process.env.REACT_APP_API_URL + "/" + color.img}
      />
    </Card>
  );
};

export default ColorItem;
