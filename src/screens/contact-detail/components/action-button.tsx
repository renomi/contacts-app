import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

export type ActionButtonProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export const ActionButton = memo(({ onDelete, onEdit }: ActionButtonProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={onEdit} style={styles.actionContainer}>
        <SimpleLineIcons name="note" size={24} color="black" />
        <Text variant="labelLarge">Edit Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.actionContainer}>
        <SimpleLineIcons name="trash" size={24} color="black" />
        <Text variant="labelLarge">Delete Contact</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  footer: {
    bottom: 8,
    flexDirection: 'row',
    columnGap: 32,
    justifyContent: 'center',
  },
  actionContainer: {
    rowGap: 8,
    alignItems: 'center',
  },
});
