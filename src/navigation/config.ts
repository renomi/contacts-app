import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const rootOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'none',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#f0f2f5',
  },
};

export const contcatDetailOptions: NativeStackNavigationOptions = {
  headerShown: true,
  title: '',
  animation: 'slide_from_right',
};
