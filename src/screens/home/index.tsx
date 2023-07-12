import { Button, ErrorIndicator, LoadingIndicator } from '@/ui';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setUser } from '@/redux/user/userSlice';
import type { RootState } from '@/redux/store';
import { useCallback } from 'react';
import { useGetContactsQuery } from '@/services/contact';

const selectUser = (state: RootState) => state.userState.user;

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser, shallowEqual);

  const handleUser = useCallback(
    () => dispatch(setUser({ isDoingTest: true })),
    [dispatch],
  );

  console.log('🧐 ~ HomeScreen ~ isDoingTest:', user?.isDoingTest ?? false);

  const { isLoading, data, isError, refetch } = useGetContactsQuery();
  console.log('🧐 ~ useGetContactsQuery ~ data:', data);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator onRefetch={refetch} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.text}>
        {!data
          ? 'Open up App.tsx to start working on your app!'
          : 'Data Has Been Fetched!'}
      </Text>

      <Button onPress={handleUser}>Set User</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    rowGap: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
  },
});
