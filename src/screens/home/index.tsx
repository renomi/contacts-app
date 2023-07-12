import {
  Button,
  ErrorIndicator,
  Input,
  LoadingIndicator,
  PressableScale,
} from '@/ui';
import { StatusBar } from 'expo-status-bar';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { ScrollView } from 'react-native-gesture-handler';
import { useCallback } from 'react';

const testSchema = z.object({
  test: z.string({ required_error: 'required' }).min(4, 'input is not valid'),
});

type TestSchema = z.infer<typeof testSchema>;

export const HomeScreen = () => {
  const { control, handleSubmit } = useForm<TestSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(testSchema),
  });

  const onSubmit: SubmitHandler<TestSchema> = useCallback(() => {}, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

      <Input control={control} name="test" placeholder="test input" />
      <Button onPress={handleSubmit(onSubmit)}>Foo</Button>

      {/* <PressableScale>
        <Text>Open up App.tsx to start working on your app!</Text>
      </PressableScale> */}

      {/* <ErrorIndicator /> */}
      {/* <LoadingIndicator /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    rowGap: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
