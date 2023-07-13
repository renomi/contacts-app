import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

export const renderBackdrop = ({
  disappearsOnIndex = -1,
  appearsOnIndex = 1,
  ...restProps
}: BottomSheetDefaultBackdropProps) => (
  <BottomSheetBackdrop
    disappearsOnIndex={disappearsOnIndex}
    appearsOnIndex={appearsOnIndex}
    {...restProps}
  />
);
