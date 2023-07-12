import { useNetInfo } from '@react-native-community/netinfo';
import { AnimatePresence, View } from 'moti';
import { Text } from 'react-native-paper';

import { indicatorStyles } from '@/ui/indicator/styles';
import { IndicatorProps } from '@/ui/indicator/types';

export const OfflineIndicator = ({
  text = 'Network Error',
  description = 'Please change to an available connection',
}: IndicatorProps) => {
  const { isInternetReachable } = useNetInfo();

  return (
    <AnimatePresence exitBeforeEnter>
      {isInternetReachable === false && (
        <View
          from={{
            translateY: -50,
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            translateY: -50,
            opacity: 0,
            scale: 0.9,
          }}
          exitTransition={{
            type: 'timing',
            duration: 500,
          }}
          style={indicatorStyles.errorContainer}>
          <Text variant="labelLarge" style={indicatorStyles.heading}>
            {text}
          </Text>
          <Text variant="bodySmall" style={indicatorStyles.message}>
            {description}
          </Text>
        </View>
      )}
    </AnimatePresence>
  );
};
