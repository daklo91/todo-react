import TodoItemClasses from "./TodoItem.module.css";
import classes from "./CreateTodo.module.css";

function CreateTodo() {
  return (
    <div className={classes.container}>
      <button>
        <div className={TodoItemClasses.checkmark}></div>
      </button>
      <input className={classes.input} placeholder="Create a new todo…" />
    </div>
  );
}

export default CreateTodo;
