import { useAppSelector } from '@/hooks';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { RootState } from '@/redux/store';

const selectContact = (state: RootState) => state.userState.contact;

export const EditContactScreen = () => {
  const currentContact = useAppSelector(selectContact);
  console.log('🧐 ~ EditContactScreen ~ currentContact:', currentContact);
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text variant="bodyMedium" style={styles.info}>
        Edit Contact Screen
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
