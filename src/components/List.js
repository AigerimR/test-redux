import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";

function List() {
  const listArr = useSelector((state) => {
    return state.list;
  });

  const renderedList = listArr.map((el, i) => {
    return <ListItem key={i} action data={el} />;
  });

  return <ListGroup>{renderedList}</ListGroup>;
}

export default List;
