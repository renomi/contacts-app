import { useGetContactQuery } from '@/services/contact';
import type { RootStackScreenProps } from '@/types/navigation';
import { ErrorIndicator, LoadingIndicator } from '@/ui';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const ContactDetailScreen = ({
  route,
}: RootStackScreenProps<'ContactDetail'>) => {
  console.log('🧐 ~ route.params.id:', route.params.id);

  const { isLoading, data, isError, refetch } = useGetContactQuery(
    route.params.id,
    {
      skip: !route.params.id,
    },
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator onRefetch={refetch} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text variant="bodyMedium" style={styles.info}>
        {JSON.stringify(data, null, 2)}
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
