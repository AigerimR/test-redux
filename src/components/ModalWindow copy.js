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
  [modalTypeIsCreate, setModalTypeIsCreate] = useState(true);

  const dispatch = useDispatch();
  const modals = useSelector((state) => {
    return state.modal;
  });
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
    <>
      <Modal
        isOpen={modals.modalConfirmAddOpen}
        ariaHideApp={false}
        className="modal_container"
      >
        <div>
          <p>{modalData.CreateDataModal.text}</p>
          <input
            onChange={handleInputChange}
            value={inputValue}
            className="modal_input"
          ></input>

          <div className="modal_btns">
            <Button onClick={handleCreate} variant={"success"}>
              {modalData.CreateDataModal.btn1}
            </Button>
            <Button onClick={handleCancel}>
              {modalData.CreateDataModal.btn2}
            </Button>
          </div>
          {/* {modals.modalConfirmAddOpen && <div>Aika Modal ADDING Window</div>} */}
        </div>
      </Modal>
      <Modal
        isOpen={modals.modalConfirmRemoveOpen}
        ariaHideApp={false}
        className="modal_container"
      >
        <div>
          <p>{modalData.RemoveDataModal.text}</p>
          <div className="modal_btns">
            <Button onClick={handleRemove} variant={"success"}>
              {modalData.RemoveDataModal.btn1}
            </Button>
            <Button onClick={handleCancel}>
              {modalData.RemoveDataModal.btn2}
            </Button>
          </div>
          {/* {modals.modalConfirmRemoveOpen && (
            <div>Aika Modal REMOVING Window</div>
          )} */}
        </div>
      </Modal>

      <Modal
        isOpen={modals.modalConfirmAddOpen || modals.modalConfirmRemoveOpen}
        ariaHideApp={false}
        className="modal_container"
      >
        <div>
          <p>{modalData.CreateDataModal.text}</p>
          <input
            onChange={handleInputChange}
            value={inputValue}
            className="modal_input"
          ></input>

          <div className="modal_btns">
            <Button onClick={handleCreate} variant={"success"}>
              {modalData.CreateDataModal.btn1}
            </Button>
            <Button onClick={handleCancel}>
              {modalData.CreateDataModal.btn2}
            </Button>
          </div>
          {/* {modals.modalConfirmAddOpen && <div>Aika Modal ADDING Window</div>} */}
        </div>
      </Modal>
    </>
  );
}

export default ModalWindow;
