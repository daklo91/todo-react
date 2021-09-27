import classes from "./TodoFilter.module.css";

function TodoFilter() {
  return (
    <div className={classes.container}>
      <button className={classes.button}>All</button>
      <button className={classes.button}>Active</button>
      <button className={classes.button}>Completed</button>
    </div>
  );
}

export default TodoFilter;
