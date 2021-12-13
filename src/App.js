import { useEffect, useState } from "react";

import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";
import TodoFilter from "./components/todoComponents/TodoFilter";

function App() {
  const [prefferedTheme, setPrefferedTheme] = useState("dark");
  const [todoListData, setTodoListData] = useState([
    {
      text: "Complete online JavaScript Course",
      id: "8d9ecc1f499a8",
      complete: true,
    },
    { text: "Jog around the park 3x", id: "a2ae0a77deb3f", complete: false },
    { text: "10 minutes meditation", id: "051a832438116", complete: false },
    { text: "Read for 1 hour", id: "6d5df995d2463", complete: false },
    { text: "Pick up groceries", id: "4203385488edb", complete: false },
    {
      text: "Complete Todo App on Frontend Mentor",
      id: "a3237b18fb5ac",
      complete: false,
    },
  ]);
  const [filterState, setFilterState] = useState("all");

  const changeThemeHandler = (theme) => {
    setPrefferedTheme(() => {
      return theme;
    });
  };

  function changeFilterState(boolean) {
    setFilterState(boolean);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", prefferedTheme);
  }, [prefferedTheme]);

  function handleCompleteToggle(id) {
    setTodoListData(
      todoListData.map((object) => {
        if (object.id === id) {
          return {
            ...object,
            complete: !object.complete,
          };
        } else return object;
      })
    );
  }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const tempArray = todoListData;
    const draggedItem = tempArray.find((item) => item.id === draggableId);

    tempArray.splice(source.index, 1);
    tempArray.splice(destination.index, 0, draggedItem);

    setTodoListData(tempArray);
  };

  function handleDeleteTodoItem(id) {
    setTodoListData(todoListData.filter((object) => object.id !== id));
  }

  function handleDeleteAllTodoItems() {
    setTodoListData(todoListData.filter((object) => object.complete === false));
  }

  const getInputTextHandler = (e, clicked) => {
    const id = Math.random().toString(16).slice(2);
    const obj = {
      text: e,
      id: id,
      complete: clicked ? true : false,
    };
    setTodoListData(() => {
      return todoListData.concat(obj);
    });
  };

  return (
    <div>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <MainHeader changeTheme={changeThemeHandler} theme={prefferedTheme} />
        <CreateTodo getInputText={getInputTextHandler} />
        <TodoList
          handleOnDragEnd={handleOnDragEnd}
          todoListData={todoListData}
          filterState={filterState}
          handleCompleteToggle={handleCompleteToggle}
          handleDeleteTodoItem={handleDeleteTodoItem}
          handleSetFilterState={changeFilterState}
          handleDeleteAllTodoItems={handleDeleteAllTodoItems}
          filterStateBigMedia={filterState}
        />
        <div className={classes.hideFilter}>
          <TodoFilter
            handleSetFilterState={changeFilterState}
            filterState={filterState}
          />
        </div>
      </div>
      <div className={classes.instructionText}>
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default App;
