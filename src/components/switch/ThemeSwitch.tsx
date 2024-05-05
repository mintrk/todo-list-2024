import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../store/theme/themeSlice";

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#91949C" : "#EBEBEB",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#EBEBEB" : "#91949C",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const ThemeSwitch = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
      {themeMode === "light" ? (
        <LightModeIcon color="primary" />
      ) : (
        <LightModeIcon color="disabled" />
      )}
      <IOSSwitch
        value={themeMode === "light" ? false : true}
        onClick={() => {
          dispatch(toggleTheme());
        }}
      />
      {themeMode === "dark" ? (
        <DarkModeIcon color="primary" />
      ) : (
        <DarkModeIcon color="disabled" />
      )}
    </div>
  );
};
