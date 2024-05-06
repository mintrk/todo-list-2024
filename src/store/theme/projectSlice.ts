import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo, Project, initialTodo } from "../../types/todo";

const initialProjectMock: Project = {
  id: 0,
  title: "Daily",
  todos: [
    { id: 0, title: "Workout 30 mins", desc: "", status: "incomplete" },
    { id: 1, title: "Homework", desc: "AI due 8 PM", status: "incomplete" },
    { id: 2, title: "Take a shower", desc: "", status: "complete" },
  ],
};
const initialState: Project[] = [];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setInitialData: (state) => {
      if (state.length === 0) state.push(initialProjectMock);
    },
    createProject: (state, action: PayloadAction<string>) => {
      const id = state.reduce((acc: number, curr: Project) => {
        if (acc < curr.id) {
          acc = curr.id;
        }
        return acc + 1;
      }, 0);
      state.push({ id: id, title: action.payload, todos: [] });
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      return state.filter((project) => {
        return project.id !== action.payload;
      });
    },
    createTodo: (
      state,
      action: PayloadAction<{ projectId: number; Todo: initialTodo }>
    ) => {
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
    deleteTodo: (
      state,
      action: PayloadAction<{ projectId: number; todoId: number }>
    ) => {
      const at = state.findIndex(
        (project) => project.id === action.payload.projectId
      );
      return state.map((project: Project, index) => {
        if (at === index) {
          const updatedTodos = state[at].todos?.filter((todo) => {
            return todo.id !== action.payload.todoId;
          });
          return { ...project, todos: updatedTodos };
        } else return project;
      });
    },
  },
});
export const {
  createProject,
  deleteProject,
  createTodo,
  updateTodo,
  deleteTodo,
  setInitialData,
} = projectSlice.actions;
export default projectSlice.reducer;
