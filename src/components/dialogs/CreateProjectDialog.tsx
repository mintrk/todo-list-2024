import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Card, CardActionArea, useTheme } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface CreateProjectDialogProps {
  onSubmit: (title: string) => void;
}

const CreateProjectDialog = ({ onSubmit }: CreateProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Card variant="outlined" sx={{ height: "12rem", width: "100%" }}>
        <CardActionArea
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setOpen(true);
            setIsError(false);
          }}>
          <AddRoundedIcon fontSize="large" />
        </CardActionArea>
      </Card>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
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
          New project
        </DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            label="Project title"
            variant="outlined"
            type="text"
            margin="dense"
            fullWidth
            required
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value != "") {
                setIsError(false);
              } else {
                setIsError(true);
              }
            }}
            error={isError}
            helperText={isError ? "This is required field" : ""}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "0 1.5rem 1.25rem" }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              boxShadow: "none",
            }}
            onClick={() => {
              if (title !== "") {
                onSubmit(title);
                setOpen(false);
              } else {
                setIsError(true);
                setIsError(false);
              }
            }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProjectDialog;
