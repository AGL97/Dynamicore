import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

interface Theme { 
  light: MD3Theme,
   dark: MD3Theme 
};

export const Colors : Theme = {
  light: MD3LightTheme,
  dark: MD3DarkTheme,
};

