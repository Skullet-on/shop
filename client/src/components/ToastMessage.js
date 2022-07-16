import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Context } from "..";

const ToastMessage = () => {
  const { toast } = useContext(Context);

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast
        show={toast.show}
        bg={toast.variant}
        delay={3000}
        autohide
        onClose={() => toast.setShow(false)}
      >
        <Toast.Header closeButton={true}></Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default observer(ToastMessage);
