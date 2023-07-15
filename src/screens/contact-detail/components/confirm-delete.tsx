import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Dialog, Portal, Text } from 'react-native-paper';

import { Button } from '@/ui';

export type ConfirmDeleteProps = {
  visible?: boolean;
  isLoading?: boolean;
  onConfirm?: () => void;
  onHide?: () => void;
};
export const ConfirmDelete = memo(
  ({
    visible = false,
    isLoading = false,
    onConfirm,
    onHide,
  }: ConfirmDeleteProps) => {
    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onHide}
          dismissable={!isLoading}
          dismissableBackButton={!isLoading}
          style={styles.dialog}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure want to delete this contact?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={isLoading} mode="text" onPress={onHide}>
              Cancel
            </Button>
            <Button loading={isLoading} mode="text" onPress={onConfirm}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  },
);
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#e5e7eb',
  },
});
