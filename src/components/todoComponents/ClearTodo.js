import classes from "./ClearTodo.module.css";

function ClearTodo() {
  return (
    <div className={classes.container}>
      <span>0 items left</span>
      <button>Clear Completed</button>
    </div>
  );
}

export default ClearTodo;
