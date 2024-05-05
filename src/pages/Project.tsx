import { Box, Container, Grid, Typography, useTheme } from "@mui/material";

import { ThemeSwitch } from "../components/switch/ThemeSwitch";
import CreateProjectDialog from "../components/dialogs/CreateProjectDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Project } from "../types/todo";
import { createProject } from "../store/theme/projectSlice";
import ProjectCard from "../components/cards/ProjectCard";
import BackButton from "../components/buttons/BackButton";

const ProjectPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project);

  const handleCreateProject = (title: string) => {
    dispatch(createProject(title));
  };

  return (
    <Container sx={{ paddingTop: { md: "2rem", xxs: "1rem" }, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <BackButton />
        <ThemeSwitch />
      </Box>
      <Typography
        variant="h3"
        color={theme.palette.info.main}
        fontWeight="bold">
        My projects
      </Typography>
      <Grid container spacing={3} sx={{ paddingTop: "2rem" }}>
        <CardGrid>
          <CreateProjectDialog onSubmit={handleCreateProject} />
        </CardGrid>
        {projects.map((project: Project) => (
          <CardGrid key={project.id}>
            <ProjectCard project={project} />
          </CardGrid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectPage;

const CardGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      item
      md={3}
      sm={4}
      xs={6}
      xxs={12}
      sx={{ display: "flex", justifyContent: "center" }}>
      {children}
    </Grid>
  );
};
