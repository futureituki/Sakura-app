import * as PaletteColorOptions from '@mui/material/styles/createPalette'
import { PaletteProps } from '@mui/system';

// PaletteOptions を拡張して、カラーキーワードを追加
declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {    
      mainColor?: PaletteColorOptions;
      subColor?: PaletteColorOptions;
    }
}

// Button の color prop に追加
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    mainColor: true;
    subColor: true;
  }
}