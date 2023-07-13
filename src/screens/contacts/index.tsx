import { searchbarTheme } from '@/constants/themes';
import { useDebouncedValue } from '@/hooks';
import { ContactList } from '@/screens/contacts/components/list';
import { useGetContactsQuery } from '@/services/contact';
import { ErrorIndicator } from '@/ui';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

export const ContactScreen = () => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const { isLoading, data, isError, isSuccess, refetch } =
    useGetContactsQuery();
  const placeholderSearch = `${data?.length} contacts`;

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
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
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
      />
    </ScrollView>
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
});
