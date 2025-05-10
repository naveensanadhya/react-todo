export const modalSizes = {
  SM: "max-w-sm",
  LG: "max-w-lg",
  XL: "max-w-xl",
};

export const Statuses = {
  PENDING: "Pending",
  COMPLETED: "Completed",
};

export const todoListFromDB = () => {
  const list = localStorage.getItem("todoList");
  if (list) {
    return JSON.parse(list);
  }
  return null;
};
