import TodoItem from "./TodoItem";
import "./TodoList.module.css";

function TodoList() {
  return (
    <ul>
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  );
}

export default TodoList;
