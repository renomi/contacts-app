import { View } from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';

import { indicatorStyles } from '@/ui/indicator/styles';
import { IndicatorProps } from '@/ui/indicator/types';

export const LoadingIndicator = ({
  text = 'Please Wait',
  description = 'loading data',
}: IndicatorProps) => {
  return (
    <View style={indicatorStyles.container}>
      <ActivityIndicator
        color="#12141a"
        size={32}
        style={indicatorStyles.spinner}
      />
      <Text variant="titleMedium" style={indicatorStyles.heading}>
        {text}
      </Text>
      <Text variant="bodyMedium" style={indicatorStyles.message}>
        {description}
      </Text>
    </View>
  );
};
