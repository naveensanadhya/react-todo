import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoApp from "./TodoApp";
import TodoItem from "./TodoItem";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="todo-detail" element={<TodoItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
