import { useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { navigationTheme } from '@/constants/themes';
import {
  addtContactOptions,
  contcatDetailOptions,
  editContactOptions,
  rootOptions,
} from '@/navigation/config';
import { navigationRef } from '@/navigation/utils';
import {
  AddContactScreen,
  ContactDetailScreen,
  ContactScreen,
} from '@/screens';
import { EditContactScreen } from '@/screens/edit-contact';
import type { RootStackParamList } from '@/types/navigation';

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
      <Stack.Screen
        name="EditContact"
        component={EditContactScreen}
        options={editContactOptions}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
        options={addtContactOptions}
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
