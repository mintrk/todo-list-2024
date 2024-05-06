import {
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeSwitch } from "../components/switch/ThemeSwitch";
import BackButton from "../components/buttons/BackButton";
import CreateTodoDialog from "../components/dialogs/CreateTodoDialog";
import { initialTodo } from "../types/todo";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../store/theme/projectSlice";
import { RootState } from "../store/store";
import TodoCard from "../components/cards/TodoCard";

const TodoPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project);
  const projectId = projects.findIndex((project) => project.id === Number(id));
  const todos = projects[projectId].todos;
  const [sort, setSort] = useState("all");

  const calculateTodo = () => {
    const allTodo = todos?.length ?? 0;
    const completeTodo =
      todos?.reduce((acc, curr) => {
        if (curr.status === "complete") {
          acc += 1;
        }
        return acc;
      }, 0) ?? 0;
    const incompleteTodo = allTodo - completeTodo;
    return { allTodo, completeTodo, incompleteTodo };
  };

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
              You've got {calculateTodo().incompleteTodo} todos
            </Typography>
            <Box
              zIndex={100}
              sx={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                [theme.breakpoints.up("sm")]: {
                  position: "static",
                },
              }}>
              <CreateTodoDialog
                onSubmit={(todo: initialTodo) => {
                  dispatch(createTodo({ projectId: Number(id), Todo: todo }));
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}>
            <Tabs
              value={sort}
              onChange={(_, value) => {
                setSort(value);
              }}
              aria-label="basic tabs example"
              allowScrollButtonsMobile
              variant="scrollable"
              sx={{
                "& .MuiTabs-scrollButtons": {
                  color: theme.palette.info.main,
                },
              }}>
              <Tab label="All todo" value="all" />
              <Tab label="Completed" value="complete" />
              <Tab label="Incomplete" value="incomplete" />
            </Tabs>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              paddingTop: "1rem",
              [theme.breakpoints.down("xs")]: {
                paddingBottom: "6rem",
              },
            }}>
            {todos
              ?.filter((todo) => {
                if (sort === "complete") {
                  return todo.status === "complete";
                } else if (sort === "incomplete") {
                  return todo.status === "incomplete";
                } else return todo;
              })
              .map((todo) => (
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
