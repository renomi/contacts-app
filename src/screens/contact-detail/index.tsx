import type { RootStackScreenProps } from '@/types/navigation';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const ContactDetailScreen = ({
  route,
}: RootStackScreenProps<'ContactDetail'>) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text variant="bodyMedium" style={styles.info}>
        Contact detail id: {route.params.id}
      </Text>
    </ScrollView>
  );
};
export default ContactDetailScreen;

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
