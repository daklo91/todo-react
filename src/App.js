import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import "./App.css";

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    console.log("changed!!");
  });

function App() {
  return (
    <div>
      <div className="background"></div>
      <div className="container">
        <MainHeader />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
