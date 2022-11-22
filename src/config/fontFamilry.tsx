import { createTheme } from "@mui/material";

export const homeFontTheme = createTheme({
  typography: {
    fontFamily: [
      '游ゴシック',
      '"Noto Sans JP"', 
      '"游ゴシック Medium"',
      'Arial',
      'sans-serif',
    ].join(','),
  }
})