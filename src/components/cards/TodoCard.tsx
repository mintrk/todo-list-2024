import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Todo } from "../../types/todo";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../store/theme/projectSlice";

interface TodoCardProps {
  todo: Todo;
  projectId: number;
}

const TodoCard = ({ todo, projectId }: TodoCardProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <>
      <Card variant="outlined">
        <CardContent
          sx={{ padding: "0.5rem !important", display: "flex", gap: "0.5rem" }}
          onClick={() => {
            const newTodo: Todo = {
              ...todo,
              status: todo.status === "complete" ? "incomplete" : "complete",
            };
            dispatch(updateTodo({ projectId: projectId, Todo: newTodo }));
          }}>
          <Checkbox
            disableRipple
            sx={{ padding: "0" }}
            checked={todo.status === "complete" ? true : false}
            onChange={(e) => {
              const newTodo: Todo = {
                ...todo,
                status: e.target.checked ? "complete" : "incomplete",
              };
              dispatch(updateTodo({ projectId: projectId, Todo: newTodo }));
            }}
          />
          <Box>
            <Typography
              sx={{
                textDecoration: `${
                  todo.status === "complete" ? "line-through" : "none"
                }`,
                color: `${todo.status === "complete" && "#CECFD3"} `,
              }}>
              {todo.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: `${todo.status === "complete" && "#CECFD3"} ` }}>
              {todo.desc || ""}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
