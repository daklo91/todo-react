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
      <ul onDragOver={(e) => e.preventDefault()}>
        {props.filterState === "all"
          ? props.todoListData.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                completeToggle={handleCompleteToggle}
                id={todo.id}
                complete={todo.complete}
                handleDeleteTodoItem={handleDeleteTodoItem}
                handleDndGetDraggedItemId={props.handleDndGetDraggedItemId}
                handleDndGetDropOverItemId={props.handleDndGetDropOverItemId}
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
                  handleDndGetDraggedItemId={props.handleDndGetDraggedItemId}
                  handleDndGetDropOverItemId={props.handleDndGetDropOverItemId}
                />
              ))}
      </ul>
      <ClearTodo
        handleSetFilterState={props.handleSetFilterState}
        handleDeleteAllTodoItems={props.handleDeleteAllTodoItems}
        todoListData={props.todoListData}
        filterState={props.filterState}
      />
    </div>
  );
}

export default TodoList;
