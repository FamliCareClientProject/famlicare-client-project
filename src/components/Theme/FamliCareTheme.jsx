import React from "react";
import { createTheme, responsiveFontSizes, GlobalStyles } from "@mui/material";
import { lighten, darken } from "@mui/system/colorManipulator";

// Utility function to generate color variants for a base color.
const generateColorVariants = (color) => ({
  main: color,
  light: lighten(color, 0.3), // Lighter variant of the base color.
  dark: darken(color, 0.1), // Darker variant for hover states.
});

// Custom fonts
const libelSuitReg = "'libel', sans-serif";
const acuminProCondensed = "'Acumin Pro', sans-serif";
const maryDale = "'Marydale', sans-serif";

// Base colors with variants for the theme.
const colors = {
  darkTeal: generateColorVariants("#2a788b"),
  orange: generateColorVariants("#eaac60"),
  green: generateColorVariants("#c2c76c"),
  darkGray: generateColorVariants("#3B3A39"),
  head_text: generateColorVariants("#406E7B"),
  light_text: generateColorVariants("#98A9AE"),
  text: generateColorVariants("#889BA1"),
  title_text: generateColorVariants("#69878E"),
};

// Theme configuration with custom color palette and typography settings.
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: colors.darkTeal,
      secondary: colors.orange,
      tertiary: colors.green,
      dark_text: colors.darkGray,
      head_text: colors.head_text,
      light_text: colors.light_text,
      text: colors.text,
      title_text: colors.title_text,
    },
    typography: {
      fontFamily: `${libelSuitReg}, ${acuminProCondensed}, ${maryDale}`,
      h1: { fontSize: "2.5rem", fontFamily: libelSuitReg },
      h2: { fontWeight: 500, fontSize: "1.5em", fontFamily: libelSuitReg },
      h3: { fontWeight: 500, fontSize: "1em", fontFamily: libelSuitReg },
      body1: { lineHeight: 1.6, fontFamily: acuminProCondensed },
      callout: { fontFamily: libelSuitReg },
      feature: { fontFamily: maryDale },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontFamily: libelSuitReg,
            fontWeight: 500,
          },
          contained: {
            borderRadius: 18,
            "&.primary": {
              backgroundColor: colors.orange.main,
              color: colors.white,
              "&:hover": { backgroundColor: colors.orange.dark },
              "&.off": {
                backgroundColor: colors.orange.light,
                color: colors.white,
              },
            },
            "&.small": {
              borderRadius: 12,
              padding: "6px 16px",
              fontSize: "0.875rem",
              "&.on": {
                backgroundColor: colors.orange.main,
                color: colors.white,
                "&:hover": { backgroundColor: colors.orange.dark },
              },
              "&.off": {
                color: colors.orange.dark,
                borderColor: colors.orange.dark,
                backgroundColor: "transparent",
              },
            },
            "&.pop-up": {
              "&.on": {
                backgroundColor: colors.darkTeal.main,
                color: colors.white,
                "&:hover": { backgroundColor: colors.darkTeal.dark },
              },
              "&.off": {
                color: colors.darkTeal.main,
                borderColor: colors.darkTeal.main,
                backgroundColor: "transparent",
                "&:hover": { borderColor: colors.darkTeal.dark },
              },
            },
            "&.medium": {
              padding: "8px 20px",
              fontSize: "0.9375rem",
              "&.on": {
                backgroundColor: colors.orange.main,
                color: colors.white,
                "&:hover": { backgroundColor: colors.orange.dark },
              },
              "&.off": {
                color: colors.orange.main,
                borderColor: colors.orange.main,
                backgroundColor: "transparent",
                "&:hover": { borderColor: colors.orange.dark },
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "16px",
            padding: "20px",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.darkTeal.main,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            lineHeight: 1.6,
            fontFamily: acuminProCondensed,
            borderRadius: 4,
            backgroundColor: colors.white,
            border: "1px solid #ced4da",
            fontSize: 16,
            padding: "10px 12px",
            "& .MuiInputBase-input::placeholder": {
              fontFamily: acuminProCondensed,
              fontSize: 16,
              fontWeight: "normal",
              color: colors.light_text.main,
            },
            "&:hover": {
              borderColor: "#b0bec5",
            },
            "&.Mui-focused": {
              borderColor: colors.darkTeal.main,
              boxShadow: `0 0 0 2px ${colors.darkTeal.light}`,
            },
            "&.Mui-error": {
              borderColor: "#f44336",
            },
            "&.Mui-disabled": {
              backgroundColor: "#e0e0e0",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            lineHeight: 1.6,
            fontFamily: acuminProCondensed,
            borderRadius: 4,
            backgroundColor: colors.white,
            border: "1px solid #ced4da",
            fontSize: 16,
            padding: "10px 12px",
            "& .MuiInputBase-input::placeholder": {
              fontFamily: acuminProCondensed,
              fontSize: 16,
              fontWeight: "normal",
              color: colors.light_text.main,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#b0bec5",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.darkTeal.main,
              borderWidth: 2,
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f44336",
            },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e0e0e0",
            },
          },
          notchedOutline: {
            borderColor: "#ced4da",
          },
          input: {
            padding: "10px 12px",
          },
        },
      },
    },
  })
);

const GlobalStylesComponent = () => <GlobalStyles styles={{
  'html, body': {
    padding: 0,
    margin: 0,
    overflowX: 'hidden', // Prevent horizontal scrolling.
  },
  '.responsive-padding': {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1), // Adjust padding for small screens.
    }
  }
}} />

export { theme as default, GlobalStylesComponent as globalStyles};