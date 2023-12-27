import { createSlice } from "@reduxjs/toolkit";
import { TaskItemModel } from "../../model/todo.model";

export interface TodoState {
  currentFilter: string;
  taskList: Array<TaskItemModel>;
}

const initialState: TodoState = {
  currentFilter: "all",
  taskList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initTaskList: (state) => {
      const taskList: string = localStorage.getItem("taskList") || "";
      state.taskList = taskList ? JSON.parse(taskList) : [];
    },
    changeType: (state, action) => {
      const newTaskList = state.taskList.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            type: action.payload.type === "pending" ? "done" : "pending",
          };
        }
        return task;
      });
      state.taskList = newTaskList;
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
    },
    changeFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    addTask: (state, action) => {
      const newTaskList = [
        ...state.taskList,
        {
          ...action.payload,
          type: "pending",
          id: state.taskList.length
            ? state.taskList.reduce(
              (maxId, task) => Math.max(maxId, task.id),
              -Infinity
            ) + 1
            : 1,
        },
      ];
      state.taskList = newTaskList;
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
    },
    editTask: (state, action) => {
      const newTaskList = state.taskList.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            ...action.payload
          };
        }
        return task;
      });
      state.taskList = newTaskList;
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
    },
    changePosition: (state, action) => {
      state.taskList = action.payload;
      localStorage.setItem("taskList", JSON.stringify(action.payload));
    },
    removeTask: (state, action) => {
      const newTaskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      state.taskList = newTaskList;
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
    },
  },
});

const todoReducer = todoSlice.reducer;
export const { changeFilter, addTask, changeType, initTaskList, removeTask, editTask, changePosition } =
  todoSlice.actions;
export default todoReducer;
