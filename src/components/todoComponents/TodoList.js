import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";

function TodoList() {
  return (
    <div className={classes.container}>
      <ul>
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </ul>
      <ClearTodo />
    </div>
  );
}

export default TodoList;
