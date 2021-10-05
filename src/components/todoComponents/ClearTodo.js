import classes from "./ClearTodo.module.css";
import TodoFilter from "./TodoFilter";

function ClearTodo(props) {
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
        className={classes.clearButton}
        onClick={props.handleDeleteAllTodoItems}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default ClearTodo;
