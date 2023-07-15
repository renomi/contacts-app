import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Image } from 'expo-image';
import { Text } from 'react-native-paper';

import images from '@/constants/images';
import { Contact as Item } from '@/services/contact/types';
import { PressableScale } from '@/ui';

export type ContactProps = {
  item?: Item;
  onPress?: () => void;
};

export const Contact = memo(({ item, onPress }: ContactProps) => {
  const fullName = item ? `${item?.firstName} ${item?.lastName}` : '—';
  return (
    <PressableScale
      onPress={onPress}
      activeScale={0.96}
      style={styles.container}>
      <Image
        recyclingKey={item?.id}
        source={item?.photo}
        placeholder={images.avatarPlaceholder}
        contentFit="cover"
        style={styles.avatar}
      />
      <Text variant="titleMedium" style={styles.name}>
        {fullName}
      </Text>
    </PressableScale>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
  },
});
