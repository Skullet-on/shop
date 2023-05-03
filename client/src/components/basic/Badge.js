import React from "react";
import "./badge.css";

const Badge = ({
  count,
  children,
  showZero,
  bg = "primary",
  text = "light",
  type = "circle",
}) => {
  return (
    <div className="uiBadge" type={type}>
      {count || showZero || type === "dot" ? (
        <div className="uiBadge_count me-2" bg={bg} text={text} type={type}>
          <span>{count}</span>
          {type === "sticker" && <div className="uiBadge_count_corner" />}
        </div>
      ) : (
        <></>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Badge;
