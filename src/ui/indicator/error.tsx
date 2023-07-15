import { memo } from 'react';
import { View } from 'react-native';

import { Button, Text } from 'react-native-paper';

import { buttonTheme } from '@/constants/themes';
import { indicatorStyles } from '@/ui/indicator/styles';
import { ErrorIndicatorProps } from '@/ui/indicator/types';

export const ErrorIndicator = memo(
  ({
    onRefetch = () => {},
    text = "Let's try that again.",
    description = `Sorry about that. There was an error loading content`,
    btnLabel = 'Retry',
  }: ErrorIndicatorProps) => {
    return (
      <View style={indicatorStyles.container}>
        <Text variant="titleMedium" style={indicatorStyles.heading}>
          {text}
        </Text>
        <Text variant="bodySmall" style={indicatorStyles.message}>
          {description}
        </Text>
        <Button
          theme={buttonTheme}
          onPressIn={onRefetch}
          mode="contained"
          icon="reload"
          style={indicatorStyles.btn}>
          {btnLabel}
        </Button>
      </View>
    );
  },
);
