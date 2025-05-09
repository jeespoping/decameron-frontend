import React, { useRef } from "react";
import { Modal, Icon } from "semantic-ui-react";
import "./ModalBasic.scss";

export default function ModalBasic({
  show,
  setShow,
  title,
  children,
  ...rest
}) {
  const onClose = () => setShow(false);
  const nodeRef = useRef(null);

  return (
    <Modal
      ref={nodeRef}
      className="modal"
      open={show}
      onClose={onClose}
      {...rest}
    >
      <Modal.Header>
        <span>{title}</span> <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
