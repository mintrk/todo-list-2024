import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { ThemeSwitch } from "../components/switch/ThemeSwitch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setInitialData } from "../store/theme/projectSlice";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const isSet = localStorage.getItem("persist:root");
    if (isSet === null) {
      dispatch(setInitialData());
    }
  }, []);

  return (
    <Container
      sx={{
        paddingTop: "2rem",
        paddingX: "2rem !important",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <ThemeSwitch />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateY(-2rem)",
          textAlign: "center",
        }}>
        <Typography
          variant="h1"
          color={theme.palette.info.main}
          fontWeight="bold">
          Todo list
        </Typography>
        <Typography
          variant="h4"
          color={theme.palette.secondary.main}
          fontWeight="medium"
          sx={{ paddingY: "0.5rem" }}>
          Let's manage your tasks !
        </Typography>
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
          }}
          size="large"
          onClick={() => {
            navigate("/projects");
          }}>
          Get started
        </Button>
      </Box>
      <Box></Box>
    </Container>
  );
};

export default Home;
