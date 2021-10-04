import classes from "./ClearTodo.module.css";
import TodoFilter from "./TodoFilter";

function ClearTodo(props) {
  return (
    <div className={classes.container}>
      <span className={classes.itemCounter}>0 items left</span>
      <div className={classes.hideFilter}>
        <TodoFilter handleSetFilterState={props.handleSetFilterState} />
      </div>
      <button className={classes.clearButton}>Clear Completed</button>
    </div>
  );
}

export default ClearTodo;
