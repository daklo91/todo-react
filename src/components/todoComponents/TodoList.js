import TodoItem from "./TodoItem";
import ClearTodo from "./ClearTodo";
import classes from "./TodoList.module.css";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

function TodoList(props) {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const showListTime = setTimeout(() => {
      setShowList(true);
    }, 10);
    return () => {
      clearTimeout(showListTime);
    };
  });

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
              className={showList === true ? classes.show : null}
            >
              {props.todoListData.map((todo, index) => (
                <TodoItem
                  index={index}
                  key={todo.id}
                  text={todo.text}
                  completeToggle={handleCompleteToggle}
                  id={todo.id}
                  complete={todo.complete}
                  handleDeleteTodoItem={handleDeleteTodoItem}
                  handleDndGetDraggedItemId={props.handleDndGetDraggedItemId}
                  handleDndGetDropOverItemId={props.handleDndGetDropOverItemId}
                  filterState={props.filterState}
                  deleteAllAnimation={props.deleteAllAnimation}
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
