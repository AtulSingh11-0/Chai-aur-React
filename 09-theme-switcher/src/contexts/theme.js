import { createContext, useContext } from "react";

// Create the ThemeContext with default values
export const ThemeContext = createContext({
  theme: "light", // default theme
  toggleTheme: () => {}, // default empty function for toggling theme
});

// Create a ThemeContextProvider component
export const ThemeContextProvider = ThemeContext.Provider;

// Custom hook to use the ThemeContext
export default function useTheme() {
  return useContext(ThemeContext);
}
