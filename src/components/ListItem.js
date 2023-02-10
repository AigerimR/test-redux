import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addToDeleteList, removeFromDeleteList } from "../store";

function ListItem({ data }) {
  const dispatch = useDispatch();

  const [picked, setPicked] = useState(false);
  const pickItemFromList = (el) => {
    setPicked(!picked);
    if (!picked) {
      dispatch(addToDeleteList(el.target.innerHTML));
    } else {
      dispatch(removeFromDeleteList(el.target.innerHTML));
    }
  };
  const itemsToRemove = useSelector((state) => {
    return state.deleteList;
  });
  useEffect(() => {
    itemsToRemove.some((item) => item === data)
      ? setPicked(true)
      : setPicked(false);
  }, [itemsToRemove]);

  return (
    <ListGroup.Item
      onClick={pickItemFromList}
      active={picked ? true : false}
      style={{ zIndex: 0 }}
    >
      {data}
    </ListGroup.Item>
  );
}

export default ListItem;
