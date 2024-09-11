import { invoke } from "@tauri-apps/api/core";
import { VitruvianTheme } from "../types/gen/VitruvianTheme";

// export const RedTheme = await getTheme("red")
// export const GreenTheme = await getTheme("green")

export function applyTheme(theme: VitruvianTheme) {
  document.documentElement.style.setProperty("--primary-color", theme.primary);
  document.documentElement.style.setProperty("--secondary-color", theme.secondary);
  document.documentElement.style.setProperty("--accent-color", theme.accent);
  document.documentElement.style.setProperty("--background-color", theme.background);
  document.documentElement.style.setProperty("--background-alt-color", theme.background_alt);
  document.documentElement.style.setProperty("--font-color", theme.font_color);
  document.documentElement.style.setProperty("background-color", theme.background);
  document.documentElement.style.setProperty("color", theme.font_color);
}

export async function getCurrentTheme() : Promise<VitruvianTheme> {
  return invoke<VitruvianTheme>("get_current_theme");
}

// export async function setDefaultTheme(theme : VitruvianTheme) {
  
// }

// export function getAvailableThemes() : string[] {
  
// }

export async function getTheme(themeId : string) : Promise<VitruvianTheme> {
  return invoke<VitruvianTheme>("get_theme", { themeId });
}