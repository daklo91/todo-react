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

  return (
    <div className={classes.container}>
      <span className={classes.itemCounter}>
        {props.todoListData.filter((todo) => todo.complete === false).length}{" "}
        items left
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
