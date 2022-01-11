import { useEffect, useState, useRef } from "react";

import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";
import TodoFilter from "./components/todoComponents/TodoFilter";
import Snackbar from "./components/UI/Snackbar";
import { useCallback } from "react";

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
  const [preventUndo, setPreventUndo] = useState(false);
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

  const handleOnBeforeDragStart = () => {
    setPreventUndo(true);
  };

  const handleOnDragEnd = (result) => {
    setPreventUndo(false);
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

    const tempArray = Array.from(todoListData);
    const draggedItem = tempArray.find((item) => item.id === draggableId);

    tempArray.splice(source.index, 1);
    tempArray.splice(destination.index, 0, draggedItem);
    localStorage.setItem("todos", JSON.stringify(tempArray));
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

  const undoDeletedItem = useCallback(() => {
    const popped = trashCan.pop();
    const tempArray = Array.from(todoListData);
    tempArray.splice(popped.oldIndex, 0, popped);
    setTodoListData(tempArray);
  }, [trashCan, todoListData]);

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

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      if (event.keyCode === 90 && event.ctrlKey) {
        if (trashCan.length > 0 && !preventUndo) {
          undoDeletedItem();
        }
      }
    };
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [undoDeletedItem, trashCan, preventUndo]);

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
            handleOnBeforeDragStart={handleOnBeforeDragStart}
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
        <span className={classes.hideOnTouchScreen}>
          Double-click to copy text to clipboard
        </span>
        <span className={classes.showOnTouchScreen}>
          Double-tap to copy text to clipboard
        </span>
        <br />
        <br />
        <span className={classes.hideOnTouchScreen}>
          <span style={{ textDecoration: "underline" }}>Keyboard hotkeys:</span>{" "}
          Focus with tab. <br />
          Grab/place with space. Move with arrow keys. <br />
          Ctrl + Z to Undo.
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
