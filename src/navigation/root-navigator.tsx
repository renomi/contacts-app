import { useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { contcatDetailOptions, rootOptions } from '@/navigation/config';
import { ContactDetailScreen, ContactScreen } from '@/screens';
import { navigationTheme } from '@/constants/themes';
import type { RootStackParamList } from '@/types/navigation';
import { navigationRef } from '@/navigation/utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Root = () => {
  return (
    <Stack.Navigator screenOptions={rootOptions}>
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetailScreen}
        options={contcatDetailOptions}
      />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  return (
    <NavigationContainer
      onReady={hideSplash}
      ref={navigationRef}
      theme={navigationTheme}>
      <Root />
    </NavigationContainer>
  );
};
