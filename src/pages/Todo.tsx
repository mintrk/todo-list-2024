import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { ThemeSwitch } from "../components/switch/ThemeSwitch";
import BackButton from "../components/buttons/BackButton";
import CreateTodoDialog from "../components/dialogs/CreateTodoDialog";
import { initialTodo } from "../types/todo";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../store/theme/projectSlice";
import { RootState } from "../store/store";
import TodoCard from "../components/cards/TodoCard";

type Props = {};

const TodoPage = (props: Props) => {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project);
  const projectId = projects.findIndex((project) => project.id === Number(id));
  const todos = projects[projectId].todos;

  return (
    <>
      <Container
        sx={{ paddingTop: { md: "2rem", xxs: "1rem" }, height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <BackButton />
          <ThemeSwitch />
        </Box>
        <Container
          sx={{ paddingTop: { md: "2rem", xxs: "1rem" } }}
          maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography
              variant="h4"
              fontWeight={600}
              color={theme.palette.info.main}>
              You've got 4 todos today
            </Typography>
            <CreateTodoDialog
              onSubmit={(todo: initialTodo) => {
                dispatch(createTodo({ projectId: Number(id), Todo: todo }));
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {todos?.map((todo) => (
              <Grid item xxs={12} key={todo.id}>
                <TodoCard todo={todo} projectId={Number(id)} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default TodoPage;
