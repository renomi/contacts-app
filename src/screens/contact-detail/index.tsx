import { useState } from 'react';
import { useGetContactQuery } from '@/services/contact';
import { ErrorIndicator, LoadingIndicator } from '@/ui';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActionButton,
  ContactInfo,
  ConfirmDelete,
} from '@/screens/contact-detail/components';

import type { RootStackScreenProps } from '@/types/navigation';

export const ContactDetailScreen = ({
  route,
}: RootStackScreenProps<'ContactDetail'>) => {
  const [isDiaglogVisible, setIsDialogVisible] = useState(false);
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
    <SafeAreaView style={styles.screen}>
      <ContactInfo data={data} />

      <ActionButton onDelete={() => setIsDialogVisible(true)} />

      <ConfirmDelete
        visible={isDiaglogVisible}
        onHide={() => setIsDialogVisible(false)}
      />
    </SafeAreaView>
  );
};
export default ContactDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    rowGap: 16,
    padding: 16,
  },
});
