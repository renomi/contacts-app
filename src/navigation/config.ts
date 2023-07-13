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

export const editContactOptions: NativeStackNavigationOptions = {
  headerShown: true,
  title: 'Edit Contact',
  animation: 'default',
};

export const addtContactOptions: NativeStackNavigationOptions = {
  headerShown: true,
  title: 'Add Contact',
  animation: 'fade_from_bottom',
};
