import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo, Project } from "../../types/todo";

const initialState: Project[] = [];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProject: (state, action: PayloadAction<string>) => {
      const id = state.reduce((acc: number, curr: Project) => {
        if (acc < curr.id) {
          acc = curr.id;
        }
        return acc + 1;
      }, 0);
      state.push({ id: id, title: action.payload });
      console.log("Create project successful!");
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      return state.filter((project) => {
        return project.id !== action.payload;
      });
    },
  },
});
export const { createProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
