import MainHeader from "./components/layout/MainHeader";
import TodoList from "./components/todoComponents/TodoList";
import "./App.css";

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
