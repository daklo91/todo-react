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
  const [deleteAllAnimation, setdeleteAllAnimation] = useState(false);
  const [undoTimer, setUndoTimer] = useState(false);
  const [clipboardTimer, setClipboardTimer] = useState(false);
  const timerForSnackbar = useRef(null);
  const timerForClipboard = useRef(null);

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
    clearTimeout(timerForSnackbar.current);
    setUndoTimer(true);
    timerForSnackbar.current = setTimeout(() => {
      setUndoTimer(false);
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
    setTodoListData((prevState) =>
      prevState.filter((object) => object.id !== id)
    );
  }

  function handleDeleteAllTodoItems() {
    setdeleteAllAnimation(true);
    setTimeout(() => {
      setTodoListData(
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
    };
    setTodoListData(() => {
      return todoListData.concat(obj);
    });
  };

  const copyTextHandler = () => {
    clearTimeout(timerForClipboard.current);
    setClipboardTimer(true);
    timerForClipboard.current = setTimeout(() => {
      setClipboardTimer(false);
    }, 3000);
  };

  return (
    <div className={classes.app}>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <MainHeader changeTheme={changeThemeHandler} theme={prefferedTheme} />
        <main>
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
            deleteAllAnimation={deleteAllAnimation}
            copyText={copyTextHandler}
          />
          <div className={classes.hideFilter}>
            <TodoFilter
              handleSetFilterState={changeFilterState}
              filterState={filterState}
            />
          </div>
        </main>
      </div>
      <footer className={classes.instructionTextContainer}>
        <span>Drag and drop to reorder list</span>
        <br />
        <span className={classes.instructionText}>
          to copy text to clipboard
        </span>
      </footer>
      <Snackbar
        timer={clipboardTimer}
        botPosition={trashCan.length > 0 ? "10%" : "5%"}
      >
        Text copied to clipboard
      </Snackbar>
      <Snackbar
        function={undoDeletedItem}
        hideWhen={trashCan.length < 1}
        timer={undoTimer}
        botPosition={"5%"}
      >
        {trashCan.length} item{trashCan.length > 1 ? "s" : null} deleted
      </Snackbar>
    </div>
  );
}

export default App;
