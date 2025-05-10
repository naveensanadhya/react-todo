import TodoCard from "./TodoCard";

const TodoList = ({ todoList, refreshList, ...rest }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {todoList.length > 0
        ? todoList.map((todo) => {
            return (
              <TodoCard
                todo={todo}
                todoList={todoList}
                refreshList={refreshList}
              />
            );
          })
        : "No Data Found"}
    </div>
  );
};

export default TodoList;
