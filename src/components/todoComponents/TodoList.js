import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";

function TodoList(props) {
  return (
    <div className={classes.container}>
      <ul>
        {props.todoListData.map((todo) => (
          <TodoItem key={todo.id} text={todo.text} />
        ))}
      </ul>
      <ClearTodo />
    </div>
  );
}

export default TodoList;
