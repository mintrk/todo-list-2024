import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ThemeSwitch } from "../components/switch/ThemeSwitch";

const Project = () => {
  const theme = useTheme();

  return (
    <Container sx={{ paddingTop: "2rem", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <ThemeSwitch />
      </Box>
      <Typography
        variant="h3"
        color={theme.palette.info.main}
        fontWeight="bold">
        My projects
      </Typography>
      <Grid container spacing={2} sx={{ paddingTop: "2rem" }}>
        <Grid
          item
          md={3}
          sm={4}
          xs={6}
          xxs={12}
          sx={{ display: "flex", justifyContent: "center" }}>
          <Card
            variant="outlined"
            sx={{ height: "12rem", maxWidth: "14rem", width: "100%" }}>
            <CardActionArea
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <AddRoundedIcon fontSize="large" />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Project;
