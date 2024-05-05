import {
  Box,
  Card,
  CardContent,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Project } from "../../types/todo";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../store/theme/projectSlice";
interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Card
        variant="outlined"
        onClick={() => {
          console.log("Click");
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
            height: "100%",
          }}>
          <Typography variant="h4" fontWeight="500">
            {project.title}
          </Typography>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDialog(true);
              }}>
              <DeleteIcon />
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
