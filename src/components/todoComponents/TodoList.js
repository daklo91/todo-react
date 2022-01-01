import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

function TodoList(props) {
  function handleCompleteToggle(id) {
    props.handleCompleteToggle(id);
  }

  function handleDeleteTodoItem(id) {
    props.handleDeleteTodoItem(id);
  }

  const onDragEnd = (result) => {
    props.handleOnDragEnd(result);
  };

  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="oneAndOnly">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {props.filterState === "all"
                ? props.todoListData.map((todo, index) => (
                    <TodoItem
                      index={index}
                      key={todo.id}
                      text={todo.text}
                      completeToggle={handleCompleteToggle}
                      id={todo.id}
                      hasAnimated={todo.hasAnimated}
                      complete={todo.complete}
                      handleDeleteTodoItem={handleDeleteTodoItem}
                      handleDndGetDraggedItemId={
                        props.handleDndGetDraggedItemId
                      }
                      handleDndGetDropOverItemId={
                        props.handleDndGetDropOverItemId
                      }
                      itemHasAnimated={props.itemHasAnimated}
                    />
                  ))
                : props.todoListData
                    .filter((todo) => todo.complete === props.filterState)
                    .map((todo, index) => (
                      <TodoItem
                        index={index}
                        key={todo.id}
                        text={todo.text}
                        hasAnimated={todo.hasAnimated}
                        completeToggle={handleCompleteToggle}
                        id={todo.id}
                        complete={todo.complete}
                        handleDeleteTodoItem={handleDeleteTodoItem}
                        itemHasAnimated={props.itemHasAnimated}
                        handleDndGetDraggedItemId={
                          props.handleDndGetDraggedItemId
                        }
                        handleDndGetDropOverItemId={
                          props.handleDndGetDropOverItemId
                        }
                      />
                    ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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
