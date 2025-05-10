import React, { useState } from "react";
import Modal from "./src/Modal";
import { modalSizes, Statuses, todoListFromDB } from "./src/Constants";
import { v4 as uuid } from "uuid";

const AddTodo = ({ showModal, closeModal, ...rest }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clearForm = () => {
    setTitle("");
    setDescription("");
  };

  const clearAndClose = () => {
    clearForm();
    closeModal();
  };

  const saveToDo = () => {
    if (!title) {
      alert("Please Enter Title");
      return;
    }

    let list = todoListFromDB();

    let todoItem = {
      id: uuid(),
      title,
      description,
      status: Statuses.PENDING,
    };
    if (!list) {
      list = [todoItem];
    } else {
      list.push(todoItem);
    }
    localStorage.setItem("todoList", JSON.stringify(list));

    if (rest.refreshList) rest.refreshList();
  };

  return (
    <>
      {showModal && (
        <Modal
          modalTitle="Add To Do"
          modalSize={modalSizes.SM}
          handleClose={closeModal}
        >
          <div>
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows={2}
              name="description"
              value={description}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-start gap-2 mt-2">
              <button
                className="border border-green-500 hover:text-white hover:bg-green-500 rounded p-2 cursor-pointer"
                onClick={() => {
                  saveToDo(), clearAndClose();
                }}
              >
                Create
              </button>
              <button
                className="border border-red-500 hover:text-white hover:bg-red-500 rounded p-2 cursor-pointer"
                onClick={clearAndClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddTodo;
