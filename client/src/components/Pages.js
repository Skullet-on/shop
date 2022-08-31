import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "../index";

const Pages = observer(() => {
  const { productStore } = useContext(Context);
  const pageCount = Math.ceil(productStore.totalCount / productStore.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={productStore.page === page}
          onClick={() => productStore.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
