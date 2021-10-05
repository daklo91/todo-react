import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";

function TodoList(props) {
  function handleCompleteToggle(id) {
    props.handleCompleteToggle(id);
  }

  function handleDeleteTodoItem(id) {
    props.handleDeleteTodoItem(id);
  }

  return (
    <div className={classes.container}>
      <ul>
        {props.filterState === "all"
          ? props.todoListData.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                completeToggle={handleCompleteToggle}
                id={todo.id}
                complete={todo.complete}
                handleDeleteTodoItem={handleDeleteTodoItem}
              />
            ))
          : props.todoListData
              .filter((todo) => todo.complete === props.filterState)
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  completeToggle={handleCompleteToggle}
                  id={todo.id}
                  complete={todo.complete}
                  handleDeleteTodoItem={handleDeleteTodoItem}
                />
              ))}
      </ul>
      <ClearTodo
        handleSetFilterState={props.handleSetFilterState}
        handleDeleteAllTodoItems={props.handleDeleteAllTodoItems}
        todoListData={props.todoListData}
      />
    </div>
  );
}

export default TodoList;
