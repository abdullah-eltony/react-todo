import { createSlice } from "@reduxjs/toolkit";
import { getInitialTodos } from "../utils/getInitTodos";


const initialState = {
  todoList: getInitialTodos(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const localTodo = window.localStorage.getItem("todoList");
      if (localTodo) {
        const todoListArr = JSON.parse(localTodo);
        todoListArr.push({ ...action.payload });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const localTodos = window.localStorage.getItem("todoList");
      if (localTodos) {
        const todoListArr = JSON.parse(localTodos);
        const newTodoList = todoListArr.filter(
          (todo) => todo.id !== action.payload
        );
        window.localStorage.setItem("todoList", JSON.stringify(newTodoList));
        state.todoList = newTodoList;
      }
    },
    updateTodo: (state, action) => {
      const localTodos = window.localStorage.getItem("todoList");
      if (localTodos) {
        const todoListArr = JSON.parse(localTodos);
        const index = todoListArr.findIndex((todo) => todo.id === action.payload.id);
        todoListArr[index] = action.payload;
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
        
      }
    },
    selectFilterStatus:(state,action)=>{
      const localTodo = window.localStorage.getItem('todoList')
      if(localTodo) {
        const todosArr = JSON.parse(localTodo)
        if(action.payload === 'all') {
          state.todoList = todosArr
        }else {
          state.todoList = todosArr.filter(todo => todo.status === action.payload)
        }
      }
     
    }
  },
});
export const { addTodo, deleteTodo, updateTodo , selectFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
