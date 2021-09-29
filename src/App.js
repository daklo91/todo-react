import { useEffect, useState } from "react";

import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";
import TodoFilter from "./components/todoComponents/TodoFilter";

function App() {
  const [prefferedTheme, setPrefferedTheme] = useState("dark");

  const changeThemeHandler = (theme) => {
    setPrefferedTheme(() => {
      return theme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", prefferedTheme);
  }, [prefferedTheme]);

  return (
    <div>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <MainHeader changeTheme={changeThemeHandler} theme={prefferedTheme} />
        <CreateTodo />
        <TodoList />
        <TodoFilter />
      </div>
      <div className={classes.instructionText}>
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default App;
