import { ContactList } from '@/screens/contacts/components/list';
import { useGetContactsQuery } from '@/services/contact';
import { ErrorIndicator, LoadingIndicator } from '@/ui';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ContactScreen = () => {
  const { isLoading, data, isError, refetch } = useGetContactsQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator onRefetch={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ContactList isLoading={isLoading} data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});
