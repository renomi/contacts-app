import { useCallback, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackScreenProps } from '@/types/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { setContact } from '@/redux/user/userSlice';
import type { RootState } from '@/redux/store';
import {
  EditContactSchema,
  editContactValidation,
} from '@/screens/edit-contact/common/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEditContactMutation } from '@/services/contact';
import { Button, Input } from '@/ui';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ConfirmationSuccess } from '@/ui/modal/confirmation-success';

const selectContact = (state: RootState) => state.userState.contact;

export const EditContactScreen = ({
  navigation,
}: RootStackScreenProps<'EditContact'>) => {
  const dispatch = useAppDispatch();
  const currentContact = useAppSelector(selectContact);
  const sheetModalSuccess = useRef<BottomSheetModal>(null);

  const handleCloseModal = useCallback(() => {
    sheetModalSuccess?.current?.close();
    navigation.goBack();
  }, [navigation]);

  const [editContact, { isLoading }] = useEditContactMutation();

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<EditContactSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(editContactValidation),
    defaultValues: {
      ...currentContact,
      //@ts-expect-error
      age: currentContact.age.toString(),
    },
  });

  const onSubmit: SubmitHandler<EditContactSchema> = useCallback(
    async updatedContact => {
      try {
        if (!currentContact?.id) return;
        const payload = { ...updatedContact, id: currentContact?.id };
        const result = await editContact(payload).unwrap();
        console.log('🧐 ~ EditContactScreen ~ result:', result);
        sheetModalSuccess?.current?.present();
      } catch (error) {
        console.log('🧐 ~ EditContactScreen ~ error:', error);
      }
    },
    [currentContact?.id],
  );
  // console.log('🧐 ~ EditContactScreen ~ errors:', errors);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(setContact(null));
    }, [dispatch]),
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
        Update Contact
      </Button>

      <ConfirmationSuccess
        message="Contact has been edited succsessfully"
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
