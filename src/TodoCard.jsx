import React, { useEffect, useRef, useState } from "react";
import { modalSizes, Statuses } from "./Constants";
import Status from "./Status";
import Modal from "./Modal";

const TodoCard = ({ todo, todoList, refreshList, ...rest }) => {
  const dropdownRef = useRef();
  const [isDropdown, setIsDropdown] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const toggleDropdown = () => setIsDropdown(!isDropdown);

  const handleStatusChange = (value) => {
    const updatedList = todoList.map((item) =>
      item.id === todo.id ? { ...item, status: value } : item
    );

    localStorage.setItem("todoList", JSON.stringify(updatedList));
    refreshList();

    setIsDropdown(false);
  };

  const handleDeleteToDo = () => {
    const updatedList = todoList.filter((item) => item.id !== todo.id);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    refreshList();

    setIsDropdown(false);
  };

  return (
    <>
      <div key={todo?.id}>
        <div className="bg-white border rounded-lg shadow-md relative">
          <div className="absolute top-2 right-2" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              &#8942;
            </button>
            {isDropdown && (
              <div className="absolute right-0 mt-2 bg-white w-40 rounded-lg shadow-lg z-99">
                <Status
                  onChange={(event) => handleStatusChange(event.target.value)}
                />
                <button
                  onClick={handleDeleteToDo}
                  className="block w-full text-left p-2 hover:bg-gray-500 hover:text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col">
            {todo?.title && <h2 className="text-md truncate">{todo?.title}</h2>}
            {todo?.description && (
              <p className="text-sm text-gray-500 truncate">
                {todo?.description}
              </p>
            )}
            <div className="flex justify-between gap-2 mt-2">
              <small className="mt-2">
                Status:{" "}
                <span
                  className={
                    todo?.status === Statuses.PENDING
                      ? "text-red-500"
                      : Statuses.COMPLETED
                      ? "text-green-500"
                      : "text-gray-500"
                  }
                >
                  {todo?.status ? todo?.status : "-"}
                </span>
              </small>
              <button
                className="bg-slate-500 hover:bg-slate-700 rounded text-white px-2 py-1 cursor-pointer"
                onClick={() => setShowViewModal(true)}
              >
                &#x1F441;View
              </button>
            </div>
          </div>
        </div>
      </div>
      {showViewModal && (
        <Modal
          modalTitle="View To Do"
          modalSize={modalSizes.SM}
          handleClose={() => setShowViewModal(false)}
        >
          <div>
            <div className="flex flex-col gap-4 mt-2">
              <h2 className="text-lg font-bold">
                Title: <span>{todo?.title}</span>
              </h2>
              <p className="text-md text-gray-500">
                Description: <span>{todo?.description}</span>
              </p>
              <small className="text-gray-700">
                Status:{" "}
                <span
                  className={
                    todo?.status === Statuses.PENDING
                      ? "text-red-700"
                      : "text-green-700"
                  }
                >
                  {todo?.status}
                </span>
              </small>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TodoCard;
