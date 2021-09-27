import classes from "./ClearTodo.module.css";

function ClearTodo() {
  return (
    <div className={classes.container}>
      <span>0 items left</span>
      <div className={classes.controlDiv}>
        <button className={classes.controlButton}>All</button>
        <button className={classes.controlButton}>Active</button>
        <button className={classes.controlButton}>Completed</button>
      </div>
      <button className={classes.clearButton}>Clear Completed</button>
    </div>
  );
}

export default ClearTodo;
