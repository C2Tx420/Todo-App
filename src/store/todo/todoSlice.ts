import { createSlice } from "@reduxjs/toolkit";
import { TaskItemModel } from "./model";

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
    changeFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    addTask: (state, action) => {
      const newTaskList = [
        ...state.taskList,
        {
          ...action.payload,
          type: 'pending',
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
    setTask: (state) => {
      const taskList: string = localStorage.getItem("taskList") || "";
      state.taskList = taskList ? JSON.parse(taskList) : [];
    },
  },
});

const todoReducer = todoSlice.reducer;
export const { changeFilter, addTask } = todoSlice.actions;
export default todoReducer;
