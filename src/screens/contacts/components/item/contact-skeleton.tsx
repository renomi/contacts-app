import { StyleSheet, View } from 'react-native';

import { Skeleton } from 'moti/skeleton';

export const ContactSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton height={50} width={50} colorMode="light" radius="round" />
      <Skeleton height={18} width="80%" colorMode="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
});
