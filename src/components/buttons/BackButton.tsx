import { IconButton, Typography, useTheme } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <IconButton
      onClick={() => navigate(-1)}
      disableRipple
      sx={{ gap: "4px", padding: "0" }}>
      <ArrowBackIosNewRoundedIcon />
      <Typography variant="h6" color={theme.palette.info.main}>
        Back
      </Typography>
    </IconButton>
  );
};

export default BackButton;
