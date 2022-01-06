import { useState } from "react";
import ClearAllModal from "../UI/ClearAllModal";
import classes from "./ClearTodo.module.css";
import TodoFilter from "./TodoFilter";

function ClearTodo(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = (yes) => {
    if (yes === "yes") {
      props.handleDeleteAllTodoItems();
    }
    setModalIsOpen(false);
  };

  const uncompleteItemArray = props.todoListData.filter(
    (todo) => todo.complete === false
  ).length;

  return (
    <div className={classes.container}>
      <span
        className={classes.itemCounter}
        title={`${uncompleteItemArray} uncompleted item${
          uncompleteItemArray !== 1 ? "s" : ""
        } left to do`}
      >
        {uncompleteItemArray} item
        {uncompleteItemArray !== 1 ? "s" : null} left
      </span>
      <div className={classes.hideFilter}>
        <TodoFilter
          handleSetFilterState={props.handleSetFilterState}
          filterState={props.filterState}
        />
      </div>
      <button
        title="Clear all completed todos"
        className={classes.clearButton}
        onClick={() =>
          props.todoListData.find((todo) => todo.complete === true)
            ? setModalIsOpen(true)
            : null
        }
      >
        Clear Completed
      </button>
      {modalIsOpen && <ClearAllModal closeModal={closeModal} />}
    </div>
  );
}

export default ClearTodo;
