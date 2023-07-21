import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Context } from "..";

const ToastMessage = () => {
  const { toastStore } = useContext(Context);

  return (
    <ToastContainer className="p-3 toastMessages__container">
      <Toast
        show={toastStore.show}
        bg={toastStore.variant}
        delay={3000}
        autohide
        onClose={() => toastStore.setShow(false)}
      >
        <Toast.Header closeButton={true}></Toast.Header>
        <Toast.Body>{toastStore.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default observer(ToastMessage);
