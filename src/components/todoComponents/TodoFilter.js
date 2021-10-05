import classes from "./TodoFilter.module.css";

function TodoFilter(props) {
  function filterStateChange(string) {
    props.handleSetFilterState(string);
  }

  return (
    <div className={classes.container}>
      <button
        className={`${classes.button} ${
          props.filterState === "all" ? classes.active : null
        }`}
        onClick={() => filterStateChange("all")}
      >
        All
      </button>
      <button
        className={`${classes.button} ${
          props.filterState === false ? classes.active : null
        }`}
        onClick={() => filterStateChange(false)}
      >
        Active
      </button>
      <button
        className={`${classes.button} ${
          props.filterState === true ? classes.active : null
        }`}
        onClick={() => filterStateChange(true)}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
