import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducer/ModalReducer";
import "./modal.css";
export default function ModalAirBnB() {
  const dispatch = useDispatch();
  const { show, ComponentContentModal } = useSelector(
    (state) => state.ModalReducer
  );
  const { props } = ComponentContentModal;
  let classContent;
  if (!props.classModal) {
    classContent = "";
  } else {
    classContent = props?.classModal;
  }
  const handleClose = () => dispatch(closeModal());
  return (
    <>
      <>
        <Modal
          className={classContent ? classContent : ""}
          show={show}
          onHide={handleClose}
          style={{ border: "none", margin: "auto 0" }}
        >
          <i
            className="fa-solid fa-xmark modal-close ml-auto"
            onClick={handleClose}
          ></i>
          <Modal.Body>{ComponentContentModal}</Modal.Body>
        </Modal>
      </>
    </>
  );
}
