export const getInitialTodos = () => {
    const localTodos = window.localStorage.getItem("todoList");
    if (localTodos) {
      return JSON.parse(localTodos);
    }
    window.localStorage.setItem("todoList", JSON.stringify([]));
    return [];
  };

  