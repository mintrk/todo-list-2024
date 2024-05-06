import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Todo } from "../../types/todo";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../store/theme/projectSlice";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
          sx={{
            padding: "0.5rem 1rem !important",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            opacity: `${todo.status === "complete" ? "0.6" : "1"}`,
          }}
          onClick={() => {
            const newTodo: Todo = {
              ...todo,
              status: todo.status === "complete" ? "incomplete" : "complete",
            };
            dispatch(updateTodo({ projectId: projectId, Todo: newTodo }));
          }}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <IconButton
              onClick={() => {
                dispatch(deleteTodo({ projectId, todoId: todo.id }));
              }}>
              <DeleteRoundedIcon
                sx={{
                  ":hover": { color: theme.palette.error.main },
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
