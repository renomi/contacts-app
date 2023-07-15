import { useCallback } from 'react';
import type { GestureResponderEvent } from 'react-native';

import { MotiTransitionProp, useAnimationState, View } from 'moti';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

import { buttonTheme } from '@/constants/themes';

export const Button = ({
  loading,
  disabled,
  mode = 'contained',
  ...rest
}: ButtonProps) => {
  //Animate Scale Down
  const animationState = useAnimationState({
    from: {
      scale: 0.965,
    },
    to: {
      scale: 1,
    },
  });

  const onPressIn = useCallback(
    (event: GestureResponderEvent) => {
      animationState.transitionTo('from');
    },
    [animationState],
  );
  const onPressOut = useCallback(
    (event: GestureResponderEvent) => {
      animationState.transitionTo('to');
    },
    [animationState],
  );

  return (
    <View state={animationState} transition={transition}>
      <PaperButton
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        theme={buttonTheme}
        mode={mode}
        loading={loading}
        disabled={disabled ?? loading}
        {...rest}
      />
    </View>
  );
};

const transition: MotiTransitionProp = {
  damping: 15,
  stiffness: 150,
  mass: 0.2,
  overshootClamping: true,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};
