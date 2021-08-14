import { Theme } from "theme-ui";
import { tailwind } from "@theme-ui/presets";

export type ExactTheme = typeof theme;
const theme = tailwind as Theme;

export default theme;
