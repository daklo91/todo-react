import { useEffect, useState, useRef } from "react";

import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";
import TodoFilter from "./components/todoComponents/TodoFilter";
import Snackbar from "./components/UI/Snackbar";

function App() {
  const [prefferedTheme, setPrefferedTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [todoListData, setTodoListData] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [filterState, setFilterState] = useState("all");
  const [trashCan, setTrashCan] = useState([]);
  const [snackbarTimer, setSnackbarTimer] = useState(false);
  const [deleteAllAnimation, setdeleteAllAnimation] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoListData));
  }, [todoListData]);

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
    localStorage.setItem("todos", JSON.stringify(todoListData));
    setTodoListData(tempArray);
  };

  function handleDeleteTodoItem(id) {
    clearTimeout(timer.current);
    setSnackbarTimer(true);
    timer.current = setTimeout(() => {
      setSnackbarTimer(false);
      setTrashCan([]);
    }, 5000);

    const oldIndex = {
      oldIndex: todoListData.findIndex((object) => object.id === id),
    };
    let deletedObject = {
      ...todoListData.filter((object) => object.id === id),
    };
    deletedObject = deletedObject["0"];
    Object.assign(deletedObject, { oldIndex: oldIndex.oldIndex });
    setTrashCan((prevState) => [...prevState, deletedObject]);
    const newListData = todoListData.filter((object) => object.id !== id);
    setTodoListData((prevState) =>
      prevState.splice(0, todoListData.length, ...newListData)
    );
  }

  function handleDeleteAllTodoItems() {
    setdeleteAllAnimation(true);
    setTimeout(() => {
      setTodoListData(
        // setFilterState("all"),
        todoListData.filter((object) => object.complete === false),
        setdeleteAllAnimation(false)
      );
    }, 400);
  }

  const undoDeletedItem = () => {
    const popped = trashCan.pop();
    const newArray = todoListData.splice(popped.oldIndex, 0, popped);
    setTodoListData(todoListData.splice(0, todoListData.length, newArray));
  };

  const getInputTextHandler = (e, clicked) => {
    const id = Math.random().toString(16).slice(2);
    const obj = {
      text: e,
      id: id,
      complete: clicked ? true : false,
      hasAnimated: false,
    };
    setTodoListData(() => {
      return todoListData.concat(obj);
    });
  };

  const itemHasAnimated = (id) => {
    const object = todoListData.find((object) => id === object.id);
    object.hasAnimated = true;
  };

  return (
    <div className={classes.app}>
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
          itemHasAnimated={itemHasAnimated}
          deleteAllAnimation={deleteAllAnimation}
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
      {snackbarTimer && trashCan.length ? (
        <Snackbar undoDeletedItem={undoDeletedItem} trashCan={trashCan} />
      ) : null}
    </div>
  );
}

export default App;
