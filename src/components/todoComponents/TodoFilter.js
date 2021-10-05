import classes from "./TodoFilter.module.css";

function TodoFilter(props) {
  function filterStateChange(string) {
    props.handleSetFilterState(string);
  }

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        onClick={() => filterStateChange("all")}
      >
        All
      </button>
      <button
        className={classes.button}
        onClick={() => filterStateChange(false)}
      >
        Active
      </button>
      <button
        className={classes.button}
        onClick={() => filterStateChange(true)}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
