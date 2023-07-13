import type { Contact } from '@/services/contact/types';
import images from '@/constants/images';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'expo-image';
import Animated, {
  FadeInDown,
  SlideInDown,
  SlideInUp,
} from 'react-native-reanimated';
import { memo } from 'react';

export const ContactInfo = memo(({ data }: { data?: Contact }) => {
  if (!data) {
    return null;
  }

  return (
    <>
      <Animated.View entering={SlideInUp.duration(500)} exiting={SlideInDown}>
        <Image
          source={data?.photo}
          contentFit="cover"
          placeholder={images.avatarPlaceholder}
          placeholderContentFit="cover"
          style={styles.avatar}
        />
      </Animated.View>

      <View style={styles.descContainer}>
        {Object.entries(data).map(([key, value], index) => {
          if (!['photo', 'id'].includes(key)) {
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 250)}
                key={index}
                style={styles.itemContainer}>
                <Text variant="titleLarge" style={styles.name}>
                  {key}
                </Text>
                <Text style={styles.label}>:</Text>
                <Text variant="titleLarge" style={styles.label}>
                  {value}
                </Text>
              </Animated.View>
            );
          }
        })}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  descContainer: {
    flex: 1,
    alignSelf: 'center',
    rowGap: 16,
  },
  name: {
    minWidth: 110,
    fontSize: 24,
  },
  label: {
    fontSize: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    columnGap: 16,
  },
});
