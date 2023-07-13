import { useCallback, useRef } from 'react';
import type { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks';
import { ScrollView, StyleSheet } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EditContactSchema,
  editContactValidation,
} from '@/screens/edit-contact/common/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Input, Button } from '@/ui';
import { ConfirmationSuccess } from '@/ui/modal/confirmation-success';

const selectContact = (state: RootState) => state.userState.contact;

export const EditContactScreen = () => {
  const currentContact = useAppSelector(selectContact);
  const sheetModalSuccess = useRef<BottomSheetModal>(null);

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
    updatedContact => {
      console.log('🧐 ~ onSubmit: ~ updatedContact:', updatedContact);
    },
    [],
  );
  // console.log('🧐 ~ EditContactScreen ~ errors:', errors);
  console.log('🧐 ~ EditContactScreen ~ currentContact:', currentContact);

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
      <Input control={control} name="age" label="age" placeholder="age" />
      <Input
        control={control}
        name="photo"
        label="photo"
        placeholder="input image url"
      />

      <Button
        disabled={!isDirty}
        onPress={handleSubmit(onSubmit)}
        style={styles.btn}>
        Update Contact
      </Button>

      <ConfirmationSuccess
        message="Contact has been edited succsessfully"
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
