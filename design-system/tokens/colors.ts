// Design System Color Tokens

export const colors = {
  // Primary Colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary Colors
  secondary: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Status Colors
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
  info: '#2196f3',
  
  // Neutrals
  white: '#ffffff',
  black: '#000000',
  
  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9e9e9e',
  },
  
  // Background Colors
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
};

export type ColorPalette = typeof colors;