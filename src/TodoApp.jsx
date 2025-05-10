import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "../AddTodo";
import { todoListFromDB } from "./Constants";
import Status from "./Status";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    setToDoListData();
  }, []);

  const setToDoListData = () => {
    const list = todoListFromDB() || [];
    setTodoList(list);
    setFilteredList(list);
  };

  const handleFilterData = (value) => {
    setStatusFilter(value);
    if (value) {
      const filtered = todoList.filter((todo) => todo.status === value);
      setFilteredList(filtered);
    } else {
      setFilteredList(todoList);
    }
  };

  const handleModalClose = () => setShowAddModal(false);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">To Do List</h2>

      <div className="flex justify-end mb-4 gap-4">
        <div className="flex gap-2">
          <Status
            value={statusFilter}
            dropdownClass="border rounded"
            onChange={(event) => {
              handleFilterData(event.target.value);
            }}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 disabled:bg-gray-300 px-4 py-2 text-white rounded cursor-pointer"
            disabled={!statusFilter}
            onClick={() => handleFilterData("")}
          >
            Clear Filter
          </button>
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 disabled:bg-green-300 px-4 py-2 text-white rounded cursor-pointer"
          onClick={() => setShowAddModal(true)}
        >
          Add Item
        </button>
      </div>
      <TodoList todoList={filteredList} refreshList={setToDoListData} />
      <AddTodo
        showModal={showAddModal}
        closeModal={handleModalClose}
        refreshList={setToDoListData}
      />
    </div>
  );
};

export default TodoApp;
