import { useMemo, useState } from 'react';
import {
  useDebouncedValue,
  useIsKeyboardVisible,
  useRefreshOnFocus,
} from '@/hooks';
import { useIsFocused } from '@react-navigation/native';

import { StyleSheet, View } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { ContactList } from '@/screens/contacts/components/list';

import { navigate } from '@/navigation/utils';
import { useGetContactsQuery } from '@/services/contact';
import { ErrorIndicator } from '@/ui';
import { fabTheme, searchbarTheme } from '@/constants/themes';

export const ContactScreen = () => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const isFocused = useIsFocused();
  const isKeyboardVisible = useIsKeyboardVisible();
  const isFABVisible = isFocused && !isKeyboardVisible;

  const { isLoading, data, isError, isSuccess, refetch } =
    useGetContactsQuery();
  const placeholderSearch = `${data?.length} contacts`;

  useRefreshOnFocus(refetch);

  const filteredData = useMemo(() => {
    if (!debouncedQuery) {
      return data;
    }
    return data?.filter(
      c =>
        c.firstName.toLowerCase().indexOf(debouncedQuery.toLowerCase()) !== -1,
    );
  }, [data, debouncedQuery]);

  if (isError) {
    return <ErrorIndicator onRefetch={refetch} />;
  }

  return (
    <>
      <View style={styles.container}>
        {isSuccess && (
          <Searchbar
            theme={searchbarTheme}
            placeholder={placeholderSearch}
            placeholderTextColor="#BDBDBD"
            iconColor="#979797"
            value={query}
            onChangeText={setQuery}
            style={styles.searchbar}
          />
        )}

        <ContactList
          isLoading={isLoading}
          data={filteredData}
          query={debouncedQuery}
          refetch={refetch}
        />
      </View>
      <FAB
        theme={fabTheme}
        icon="plus"
        visible={isFABVisible}
        style={styles.fab}
        onPress={() => navigate('AddContact')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  searchbar: {
    margin: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
  },
});
