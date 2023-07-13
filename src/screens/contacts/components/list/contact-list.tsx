import { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  Contact,
  ContactProps,
  ContactSkeleton,
} from '@/screens/contacts/components/item';
import { FlashList, ListRenderItem } from '@shopify/flash-list';

export type ContactListProps = {
  data?: ContactProps['item'][];
  isLoading?: boolean;
};

export const ContactList = memo(
  ({ data, isLoading = false }: ContactListProps) => {
    const renderItem: ListRenderItem<ContactProps['item']> = useCallback(
      ({ item }) => <Contact item={item} />,
      [],
    );

    const listEmptyComponent = useCallback(() => {
      if (isLoading && !data) {
        return (
          <View>
            {[...Array.from({ length: 10 })].map((_, index) => (
              <ContactSkeleton key={index} />
            ))}
          </View>
        );
      }
      return null;
    }, [isLoading, data]);

    const keyExtractor = useCallback(
      (item: ContactProps['item'], index: number) =>
        item?.id ?? index.toString(),
      [],
    );

    return (
      <FlashList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        estimatedItemSize={82}
      />
    );
  },
);

const styles = StyleSheet.create({});
