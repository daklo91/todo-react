import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import classes from "./App.module.css";
import CreateTodo from "./components/todoComponents/CreateTodo";

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    console.log("changed!!");
  });

function App() {
  return (
    <div>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <MainHeader />
        <CreateTodo />
        <TodoList />
      </div>
      <div className={classes.instructionText}>
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default App;
