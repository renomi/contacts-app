import { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  Contact,
  ContactProps,
  ContactSkeleton,
} from '@/screens/contacts/components/item';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import Animated, { FadeInRight } from 'react-native-reanimated';

export type ContactListProps = {
  data?: ContactProps['item'][];
  isLoading?: boolean;
  query?: string;
};

export const ContactList = memo(
  ({ data, isLoading = false, query }: ContactListProps) => {
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

      if (query?.length !== 0 && data?.length === 0) {
        return (
          <Animated.View
            entering={FadeInRight}
            style={styles.emptyListContainer}>
            <SimpleLineIcons name="user-unfollow" size={64} color="#6b7280" />
            <Text variant="titleMedium">No contacts</Text>
          </Animated.View>
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

const styles = StyleSheet.create({
  emptyListContainer: {
    paddingTop: '20%',
    rowGap: 16,
    alignItems: 'center',
  },
});
