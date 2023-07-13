import { DefaultTheme, Theme } from '@react-navigation/native';
import type { ThemeProp } from 'react-native-paper/lib/typescript/src/types';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#12141a',
    background: '#f0f2f5',
    text: '#15181E',
  },
};

/**
 * We can override the react-navigation and react-native-papers' theme
 * See here for keys of the theme you can also define your own color key and it will available on theme object
 * https://callstack.github.io/react-native-paper/docs/guides/theming
 */

// based on seed colors  #12141a

export const buttonTheme: ThemeProp = {
  colors: {
    primary: '#12141a',
    onPrimary: '#fff',
    secondaryContainer: '#22262FE6',
    onSecondaryContainer: '#FFF',
    outline: '#12141a',
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
  },
};

export const searchbarTheme: ThemeProp = {
  colors: {
    elevation: {
      level3: '#e5e7eb',
    },
    onSurface: '#1f2937',
    onSurfaceVariant: '#15181E',
  },
};
