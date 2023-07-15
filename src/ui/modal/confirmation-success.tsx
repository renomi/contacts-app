import { forwardRef, memo, useMemo } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Text } from 'react-native-paper';

import { renderBackdrop } from '@/ui/bottom-sheet';
import { Button } from '@/ui/button';

export type ConfirmationSuccessProps = {
  message?: string;
  btnLabel?: string;
  icon?: keyof typeof SimpleLineIcons.glyphMap;
  iconColor?: ColorValue;
  onConfirm?: () => void;
  onDismiss?: () => void;
};

export const ConfirmationSuccess = memo(
  forwardRef<BottomSheetModal, ConfirmationSuccessProps>(
    (
      {
        onConfirm,
        onDismiss,
        message = 'Succes Message',
        btnLabel = 'Okay',
        icon = 'check',
        iconColor = 'black',
      },
      ref,
    ) => {
      const snapPoints = useMemo(() => ['50%'], []);
      return (
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onDismiss={onDismiss}>
          <View style={styles.contentContainer}>
            <SimpleLineIcons name={icon} size={80} color={iconColor} />
            <Text variant="bodyLarge" style={styles.heading}>
              {message}
            </Text>

            <Button onPress={onConfirm} mode="contained" style={styles.btn}>
              {btnLabel}
            </Button>
          </View>
        </BottomSheetModal>
      );
    },
  ),
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 50,
    rowGap: 20,
    paddingHorizontal: 16,
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    maxWidth: 250,
    textAlign: 'center',
  },
  btn: {
    minWidth: '100%',
    borderRadius: 6,
    marginTop: 16,
  },
});
