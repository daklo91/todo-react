import { useRef } from "react";
import TodoItemClasses from "./TodoItem.module.css";
import classes from "./CreateTodo.module.css";

function CreateTodo(props) {
  const inputRef = useRef();

  function submitHandler(e) {
    if (inputRef.current.value !== "") {
      props.getInputText(inputRef.current.value);
    }
    e.preventDefault();
    inputRef.current.value = "";
  }

  return (
    <div className={classes.container}>
      <button className={TodoItemClasses.checkmarkButton}>
        <div className={TodoItemClasses.checkmarkBorder}>
          <div className={TodoItemClasses.checkmark}></div>
        </div>
      </button>
      <form onSubmit={submitHandler} className={classes.createTodoform}>
        <input
          className={classes.input}
          ref={inputRef}
          placeholder="Create a new todo…"
        />
      </form>
    </div>
  );
}

export default CreateTodo;
