import { useCreateContactMutation } from '@/services/contact';
import {
  contactValidation,
  ContactValidationSchema,
} from '@/services/contact/schema';
import { Button, Input } from '@/ui';
import { ConfirmationSuccess } from '@/ui/modal/confirmation-success';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { RootStackScreenProps } from '@/types/navigation';

export const AddContactScreen = ({
  navigation,
}: RootStackScreenProps<'AddContact'>) => {
  const sheetModalSuccess = useRef<BottomSheetModal>(null);

  const handleCloseModal = useCallback(() => {
    sheetModalSuccess?.current?.close();
    navigation.goBack();
  }, [navigation]);

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<ContactValidationSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(contactValidation),
  });

  console.log('🧐 ~ AddContactScreen ~ errors:', errors);

  const [create, { isLoading }] = useCreateContactMutation();

  const onSubmit: SubmitHandler<ContactValidationSchema> = useCallback(
    async payload => {
      try {
        const result = await create(payload).unwrap();
        console.log('🧐 ~ AddContactScreen ~ result:', result);
        sheetModalSuccess?.current?.present();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (error) {
        console.log('🧐 ~AddContactScreen ~ error:', error);
      }
    },
    [create],
  );

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Input
        control={control}
        name="firstName"
        label="first name"
        placeholder="first name"
      />
      <Input
        control={control}
        name="lastName"
        label="last name"
        placeholder="last name"
      />
      <Input
        control={control}
        name="age"
        label="age"
        placeholder="age"
        keyboardType="number-pad"
      />
      <Input
        control={control}
        name="photo"
        label="photo"
        placeholder="input image url"
      />

      <Button
        disabled={!isDirty}
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={styles.btn}>
        Save
      </Button>

      <ConfirmationSuccess
        message="Contact has been created succsessfully"
        onConfirm={handleCloseModal}
        ref={sheetModalSuccess}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    rowGap: 8,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  btn: {
    marginTop: 32,
  },
});
