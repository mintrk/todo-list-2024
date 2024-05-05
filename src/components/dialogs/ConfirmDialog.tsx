import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material";

interface ConfirmDialog {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  color,
}: ConfirmDialog) => {
  const theme = useTheme();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth>
      {children}
      <DialogActions sx={{ padding: "0 1.5rem 1.25rem" }}>
        <Button
          onClick={onClose}
          color={color ?? "primary"}
          sx={{ color: theme.palette.info.main }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            boxShadow: "none",
            color: color
              ? theme.palette.getContrastText(theme.palette[color].dark)
              : "#fff",
          }}
          color={color ?? "primary"}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
