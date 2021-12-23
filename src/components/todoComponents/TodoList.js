import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

function TodoList(props) {
  const [maxHeightState, setMaxHeightState] = useState(null);
  const [minHeightState, setMinHeightState] = useState(null);

  const itemNumber = props.todoListData.length;

  useEffect(() => {
    setMaxHeightState(57 * itemNumber + 1);
    setMinHeightState(57 * itemNumber + 1);
  }, [itemNumber]);

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
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                maxHeight: maxHeightState + "px",
                minHeight: minHeightState + "px",
              }}
            >
              {props.filterState === "all"
                ? props.todoListData.map((todo, index) => (
                    <TodoItem
                      index={index}
                      key={todo.id}
                      text={todo.text}
                      completeToggle={handleCompleteToggle}
                      id={todo.id}
                      complete={todo.complete}
                      handleDeleteTodoItem={handleDeleteTodoItem}
                      handleDndGetDraggedItemId={
                        props.handleDndGetDraggedItemId
                      }
                      handleDndGetDropOverItemId={
                        props.handleDndGetDropOverItemId
                      }
                    />
                  ))
                : props.todoListData
                    .filter((todo) => todo.complete === props.filterState)
                    .map((todo, index) => (
                      <TodoItem
                        index={index}
                        key={todo.id}
                        text={todo.text}
                        completeToggle={handleCompleteToggle}
                        id={todo.id}
                        complete={todo.complete}
                        handleDeleteTodoItem={handleDeleteTodoItem}
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
