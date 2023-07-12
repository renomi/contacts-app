import { ComponentProps, useCallback, useRef } from 'react';

import {
  MotiPressable,
  MotiPressableInteractionState,
  MotiPressableTransitionProp,
} from 'moti/interactions';

type Props = Omit<ComponentProps<typeof MotiPressable>, 'animate'> & {
  activeScale?: number;
};

export const PressableScale = ({ activeScale = 0.975, ...props }: Props) => {
  const transition = useRef<MotiPressableTransitionProp>({
    type: 'spring',
    damping: 15,
    stiffness: 150,
    mass: 0.2,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  }).current;

  const animate = useCallback(
    ({ pressed }: MotiPressableInteractionState) => {
      'worklet';

      return {
        scale: pressed ? activeScale : 1,
      };
    },
    [activeScale],
  );

  return <MotiPressable {...props} animate={animate} transition={transition} />;
};
