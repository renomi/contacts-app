import { memo, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  Contact,
  ContactProps,
  ContactSkeleton,
} from '@/screens/contacts/components/item';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { navigate } from '@/navigation/utils';
import { useRefreshByUser } from '@/hooks';

export type ContactListProps = {
  data?: ContactProps['item'][];
  isLoading?: boolean;
  query?: string;
  refetch?: () => void;
};

export const ContactList = memo(
  ({ data, isLoading = false, query, refetch }: ContactListProps) => {
    const handleItem = useCallback((id?: string) => {
      if (id) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigate('ContactDetail', { id });
      }
    }, []);

    const renderItem: ListRenderItem<ContactProps['item']> = useCallback(
      ({ item }) => (
        <Contact onPress={() => handleItem(item?.id)} item={item} />
      ),
      [handleItem],
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

    const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

    return (
      <FlashList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        estimatedItemSize={82}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
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
