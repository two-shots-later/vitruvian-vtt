import type { Preview } from "@storybook/react";
import '../src/App.css';

import {getCurrentTheme, applyTheme} from "../src/common/theme"
import { VitruvianTheme } from "../src/types/gen/VitruvianTheme";
import { background } from "@storybook/core/theming";

// For now we will just hardcode the theme
// Later this can be replaced with a call to the backend
// If we ever get storybook to work on tauri, or we have a 
// real server to fetch from.
const theme : VitruvianTheme = {
    primary: "#ff7598",
    secondary: "#fe2b71",
    accent: "#59dfaa",
    background: "#292929",
    background_alt: "#2e2e2e",
    font_color_primary: "#ffffff",
    font_color_secondary: "#909090",
    font_primary : "CrimsonPro"
}

applyTheme(theme);

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        {name : "dark", value: "var(--background-color)"}
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
