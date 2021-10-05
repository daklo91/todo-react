import { useEffect, useState } from "react";

import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";
import TodoFilter from "./components/todoComponents/TodoFilter";

function App() {
  const [prefferedTheme, setPrefferedTheme] = useState("dark");
  const [todoListData, setTodoListData] = useState([]);
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

  let dragItem = "";
  let DropOverItem = "";

  function dndGetDraggedItemId(id) {
    dragItem = id;
  }

  function dndGetDropOverItemId(id) {
    DropOverItem = id;
    dndReorderList();
  }

  function dndReorderList() {
    let array = todoListData;
    const dragIndex = todoListData.findIndex((el) => el.id === dragItem);
    const dropIndex = todoListData.findIndex((el) => el.id === DropOverItem);
    const dragItemElement = todoListData.filter((el) => el.id === dragItem);
    // const dropItemElement = todoListData.filter((el) => el.id === DropOverItem);
    array.splice(dragIndex, 1);
    array.splice(dropIndex, 0, ...dragItemElement);
    setTodoListData(todoListData.splice(0, todoListData.length, array));
  }

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
          todoListData={todoListData}
          filterState={filterState}
          handleCompleteToggle={handleCompleteToggle}
          handleDeleteTodoItem={handleDeleteTodoItem}
          handleSetFilterState={changeFilterState}
          handleDeleteAllTodoItems={handleDeleteAllTodoItems}
          handleDndGetDraggedItemId={dndGetDraggedItemId}
          handleDndGetDropOverItemId={dndGetDropOverItemId}
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
