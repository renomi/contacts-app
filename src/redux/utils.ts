import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-simple-toast';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejected(action)) {
      console.log('🧐 ~ action:', action);
      const { payload } = action;
      Toast.showWithGravity(
        `Err ${payload?.status ? payload?.status : ''}: something happened`,
        Toast.LONG,
        Toast.BOTTOM,
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    return next(action);
  };
