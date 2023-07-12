import { Button, ErrorIndicator, LoadingIndicator, PressableScale } from '@/ui';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <PressableScale>
        <Text>Open up App.tsx to start working on your app!</Text>
      </PressableScale>

      {/* <Button>Foo</Button> */}
      {/* <ErrorIndicator /> */}
      {/* <LoadingIndicator /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
