import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { SxProps, useTheme } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { initialTodo } from "../../types/todo";

interface CreateTodoDialogProps {
  onSubmit: (todo: initialTodo) => void;
  sxButton?: SxProps;
}

const CreateTodoDialog = ({ onSubmit, sxButton }: CreateTodoDialogProps) => {
  const initialTodoValue: initialTodo = {
    title: "",
    desc: "",
  };
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<initialTodo>(initialTodoValue);
  const [isError, setIsError] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Button
        variant="contained"
        sx={{
          color: theme.palette.background.default,
          marginY: "1rem",
          textTransform: "none",
          fontWeight: "600",
          fontSize: "18px",
          borderRadius: "2rem",
          boxShadow: "none",
          padding: "0.6rem 2rem",
          ":hover": {
            color: "white",
            scale: "1.05",
          },
          ...sxButton,
        }}
        size="large"
        onClick={() => {
          setOpen(true);
        }}
        startIcon={<AddRoundedIcon />}>
        Add todo
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setIsError(false);
          setTodo(initialTodoValue);
        }}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.background.default,
          },
        }}>
        <DialogTitle
          sx={{ padding: "1rem 1.5rem 0.5rem" }}
          fontWeight="600"
          fontSize={24}>
          New Todo
        </DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
            required
            onChange={(e) => {
              setTodo({ ...todo, title: e.target.value });
              if (e.target.value != "") {
                setIsError(false);
              } else {
                setIsError(true);
              }
            }}
            error={isError}
            helperText={isError ? "This is required field" : ""}
          />
          <TextField
            id="description"
            label="Description (Optional)"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
            onChange={(e) => {
              setTodo({ ...todo, desc: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "0 1.5rem 1.25rem" }}>
          <Button
            onClick={() => {
              setOpen(false);
              setIsError(false);
              setTodo(initialTodoValue);
            }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              boxShadow: "none",
            }}
            onClick={() => {
              if (todo.title !== "") {
                onSubmit(todo);
                setOpen(false);
              } else {
                setIsError(true);
              }
            }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTodoDialog;
