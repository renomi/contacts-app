import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const AddContactScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text variant="bodyMedium" style={styles.info}>
        Add Contact Screen
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  info: {
    maxWidth: 400,
    textAlign: 'center',
  },
});
