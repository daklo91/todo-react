import { useRef, useState, useEffect } from "react";
import TodoItemClasses from "./TodoItem.module.css";
import classes from "./CreateTodo.module.css";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../assets/config/confettiConfig";

function CreateTodo(props) {
  const inputRef = useRef();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const conffetiTime = setTimeout(() => {
      setConfetti(false);
    }, 100);
    return () => {
      clearTimeout(conffetiTime);
    };
  }, [confetti]);

  function submitHandler(e, clicked) {
    if (inputRef.current.value !== "" && clicked === "clicked") {
      props.getInputText(inputRef.current.value, clicked);
      setConfetti(true);
    } else if (inputRef.current.value !== "" && clicked !== "clicked") {
      props.getInputText(inputRef.current.value);
    }
    e.preventDefault();
    inputRef.current.value = "";
  }

  return (
    <div className={classes.container}>
      <Confetti active={confetti} config={confettiConfig} />
      <button
        title="Create a completed todo"
        onClick={(e) => submitHandler(e, "clicked")}
        className={TodoItemClasses.checkmarkButton}
      >
        <span className={TodoItemClasses.checkmarkBorder}>
          <span className={TodoItemClasses.checkmark}></span>
        </span>
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
