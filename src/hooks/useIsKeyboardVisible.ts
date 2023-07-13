import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useIsKeyboardVisible = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const didShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsVisible(true),
    );

    const didHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsVisible(false),
    );

    return () => {
      didShowListener?.remove();
      didHideListener?.remove();
    };
  }, []);

  return isVisible;
};
