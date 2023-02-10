import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { Button } from "react-bootstrap";

import "./ModalWindow.css";
import {
  addToList,
  removeFromList,
  openAddModal,
  openRemoveModal,
  removeFromDeleteList,
} from "../store";

function ModalWindow() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => {
    return state.modal;
  });
  const modalTypeIsCreate = modals.modalConfirmAddOpen;
  const modalTypeIsDelete = modals.modalConfirmRemoveOpen;

  const modalData = {
    CreateDataModal: {
      text: "Создать запись?",
      btn1: "Ок",
      btn2: "Отмена",
    },
    RemoveDataModal: {
      text: "Удалить запись?",
      btn1: "Да",
      btn2: "Нет",
    },
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreate = () => {
    inputValue === ""
      ? dispatch(openAddModal(false))
      : dispatch(addToList(inputValue));
    dispatch(openAddModal(false));
    setInputValue("");
  };
  const itemsToRemove = useSelector((state) => {
    return state.deleteList;
  });
  const handleRemove = () => {
    itemsToRemove.forEach((item) => {
      dispatch(removeFromList(item));
      dispatch(removeFromDeleteList(item));
    });
    dispatch(openRemoveModal(false));
  };
  const handleCancel = () => {
    dispatch(openAddModal(false));
    dispatch(openRemoveModal(false));
    setInputValue("");
  };

  return (
    <Modal
      isOpen={modalTypeIsCreate || modalTypeIsDelete}
      ariaHideApp={false}
      className="modal_container"
    >
      <div>
        <p>
          {modalTypeIsCreate
            ? modalData.CreateDataModal.text
            : modalData.RemoveDataModal.text}
        </p>
        {modalTypeIsCreate ? (
          <input
            onChange={handleInputChange}
            value={inputValue}
            className="modal_input"
          ></input>
        ) : (
          <></>
        )}

        <div className="modal_btns">
          <Button
            onClick={modalTypeIsCreate ? handleCreate : handleRemove}
            variant={"success"}
          >
            {modalTypeIsCreate
              ? modalData.CreateDataModal.btn1
              : modalData.RemoveDataModal.btn1}
          </Button>
          <Button onClick={handleCancel}>
            {modalTypeIsCreate
              ? modalData.CreateDataModal.btn2
              : modalData.RemoveDataModal.btn2}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalWindow;
