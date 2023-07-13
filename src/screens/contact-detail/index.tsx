import { useCallback, useState } from 'react';
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from '@/services/contact';
import { ErrorIndicator, LoadingIndicator } from '@/ui';
import Toast from 'react-native-simple-toast';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActionButton,
  ContactInfo,
  ConfirmDelete,
} from '@/screens/contact-detail/components';

import type { RootStackScreenProps } from '@/types/navigation';

export const ContactDetailScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'ContactDetail'>) => {
  const [isDiaglogVisible, setIsDialogVisible] = useState(false);
  const { isLoading, data, isError, refetch } = useGetContactQuery(
    route.params.id,
    {
      skip: !route.params.id,
    },
  );

  const [deleteContact, { isLoading: isSubmitting }] =
    useDeleteContactMutation();

  /**
   * TODO :
   * verify why delete fails, when the Implementation is right as per swagger documentation.
   * @see https://contact.herokuapp.com/documentation#!/contact/deleteContactId  status is 400 too.
   * response is null or no content.
   */
  const handleDelete = useCallback(async () => {
    try {
      const result = await deleteContact(route?.params?.id).unwrap();
      console.log('🧐 ~ handleDelete ~ result:', result);
      Toast.showWithGravity(
        'Deleted contact successfully',
        Toast.LONG,
        Toast.BOTTOM,
      );
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Toast.showWithGravity(
        //@ts-expect-error
        `${err?.status ? err?.status : ''}: something bad happened`,
        Toast.LONG,
        Toast.BOTTOM,
      );
    } finally {
      setIsDialogVisible(false);
    }
  }, [route?.params?.id, navigation, deleteContact]);

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
        isLoading={isSubmitting}
        onConfirm={handleDelete}
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
