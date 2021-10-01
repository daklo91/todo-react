import { useEffect, useState } from "react";

import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";
import TodoFilter from "./components/todoComponents/TodoFilter";

function App() {
  const [prefferedTheme, setPrefferedTheme] = useState("dark");
  const [todoListData, setTodoListData] = useState([]);

  const changeThemeHandler = (theme) => {
    setPrefferedTheme(() => {
      return theme;
    });
  };

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

  function handleDeleteTodoItem(id) {
    setTodoListData(todoListData.filter((object) => object.id !== id));
  }

  const getInputTextHandler = (e) => {
    const id = Math.random().toString(16).slice(2);
    const obj = {
      text: e,
      id: id,
      complete: false,
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
          handleCompleteToggle={handleCompleteToggle}
          handleDeleteTodoItem={handleDeleteTodoItem}
        />
        <TodoFilter />
      </div>
      <div className={classes.instructionText}>
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default App;
