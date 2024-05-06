import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Project } from "../../types/todo";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../store/theme/projectSlice";
import { useNavigate } from "react-router-dom";
interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const calculateTodo = () => {
    const todos = project.todos;
    const allTodo = todos?.length ?? 0;
    const completeTodo =
      todos?.reduce((acc, curr) => {
        if (curr.status === "complete") {
          acc += 1;
        }
        return acc;
      }, 0) ?? 0;
    const incompleteTodo = allTodo - completeTodo;
    const percent = (completeTodo / allTodo) * 100 || 0;
    return { incompleteTodo, percent };
  };
  return (
    <>
      <Card
        variant="outlined"
        onClick={() => {
          navigate(`/todo/${project.id}`);
        }}
        sx={{
          height: "12rem",
          width: "100%",
          cursor: "pointer",
          ":hover": { scale: " 1.02", animationDuration: "300s" },
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "1rem !important",
            height: "100%",
          }}>
          <Typography variant="h4" fontWeight="500">
            {project.title}
          </Typography>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <CircularProgressWithLabel value={calculateTodo().percent} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <Typography variant="subtitle1" color="text.secondary">
              {calculateTodo().incompleteTodo}{" "}
              {calculateTodo().incompleteTodo > 1 ? "todos" : "todo"} left
            </Typography>
            <IconButton
              disableRipple
              sx={{ padding: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDialog(true);
              }}>
              <DeleteIcon
                sx={{
                  ":hover": { color: theme.palette.error.main },
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <ConfirmDialog
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onSubmit={() => {
          dispatch(deleteProject(project.id));
        }}
        color="error">
        <DialogTitle variant="h5" fontWeight={600}>
          Are you sure ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="h6" color="info">
            Project : {project.title}
          </DialogContentText>
          <DialogContentText>
            Deleting this item cannot be undone
          </DialogContentText>
        </DialogContent>
      </ConfirmDialog>
    </>
  );
};

export default ProjectCard;

function CircularProgressWithLabel(props: { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={props.value} size={70} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
