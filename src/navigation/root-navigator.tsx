import { useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { rootOptions } from '@/navigation/config';
import { ContactScreen } from '@/screens';
import { navigationTheme } from '@/constants/themes';
import type { RootStackParamList } from '@/types/navigation';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const Root = () => {
  return (
    <Stack.Navigator screenOptions={rootOptions}>
      <Stack.Screen name="Contacts" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  return (
    <NavigationContainer onReady={hideSplash} theme={navigationTheme}>
      <Root />
    </NavigationContainer>
  );
};
