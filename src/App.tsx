import { StyleSheet } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { enableFreeze } from 'react-native-screens';

import { RootNavigator } from '@/navigation';
import { OfflineIndicator } from '@/ui';

import { persistor, store } from '@/redux/store';
import { storage } from '@/redux/storage';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';

// prevent parts of component tree from rendering, while keeping its state untouched.
enableFreeze(true);
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync('#f0f2f5');

if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
            <PaperProvider>
              <OfflineIndicator />
              <RootNavigator />
            </PaperProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
