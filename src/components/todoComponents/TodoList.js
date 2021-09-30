import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";

function TodoList(props) {
  function handleCompleteToggle(id) {
    props.handleCompleteToggle(id);
  }

  return (
    <div className={classes.container}>
      <ul>
        {props.todoListData.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completeToggle={handleCompleteToggle}
            id={todo.id}
            complete={todo.complete}
          />
        ))}
      </ul>
      <ClearTodo />
    </div>
  );
}

export default TodoList;
