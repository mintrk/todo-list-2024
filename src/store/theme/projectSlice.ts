import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo, Project, initialTodo } from "../../types/todo";
import { Update } from "@mui/icons-material";

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
      state.push({ id: id, title: action.payload, todos: [] });
      console.log("Create project successful!");
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      return state.filter((project) => {
        return project.id !== action.payload;
      });
    },
    createTodo: (
      state,
      action: PayloadAction<{ projectId: number; Todo: initialTodo }>
    ) => {
      console.log(action.payload);
      console.log({ ...action.payload.Todo });
      const at = state.findIndex(
        (project) => project.id === action.payload.projectId
      );
      const id =
        state[at].todos?.reduce((acc: number, curr: Todo) => {
          if (acc < curr.id) {
            acc = curr.id;
          }
          return acc + 1;
        }, 0) ?? 0;

      return state.map((project: Project, index) => {
        if (at === index) {
          return {
            ...project,
            todos: [
              ...(project.todos ?? []),
              {
                id,
                ...action.payload.Todo,
                status: "incomplete",
              },
            ],
          };
        } else return project;
      });
    },
    updateTodo: (
      state,
      action: PayloadAction<{ projectId: number; Todo: Todo }>
    ) => {
      console.log("Update : ", action.payload);
      const at = state.findIndex(
        (project) => project.id === action.payload.projectId
      );
      return state.map((project: Project, index) => {
        if (at === index) {
          const updatedTodos = state[at].todos?.map((todo) => {
            if (todo.id === action.payload.Todo.id) {
              return action.payload.Todo;
            } else {
              return todo;
            }
          });
          return { ...project, todos: updatedTodos };
        } else return project;
      });
    },
  },
});
export const { createProject, deleteProject, createTodo, updateTodo } =
  projectSlice.actions;
export default projectSlice.reducer;
