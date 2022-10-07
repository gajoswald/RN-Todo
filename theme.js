import {Portal, ThemeProvider, DefaultTheme} from 'react-native-paper';

export default {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#003B70',
    accent: '#CF0A2C',
    disabled: 'white',
    backdrop: '#CF0A2Cee',
  },
};