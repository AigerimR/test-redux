import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import List from "./components/List";
import ModalWindow from "./components/ModalWindow";
import { openAddModal, openRemoveModal } from "./store";

function App() {
  const dispatch = useDispatch();
  const handleAddToList = () => {
    dispatch(openAddModal(true));
  };
  const handleRemoveFromList = () => {
    dispatch(openRemoveModal(true));
  };

  return (
    <div className="App">
      <div className="action_btns">
        <Button onClick={handleAddToList} variant={"success"}>
          Добавить
        </Button>
        <Button onClick={handleRemoveFromList}>Удалить</Button>
      </div>
      <ModalWindow />
      <List />
    </div>
  );
}

export default App;
