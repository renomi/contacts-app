import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

import { ControlledInputProps } from '@/ui/input/types';

export const Input = <T extends FieldValues>({
  name,
  control,
  rules,
  mask,
  mode = 'outlined',
  placeholderTextColor = '#ABAFB1',
  outlineColor = '#CAD0DB',
  activeOutlineColor = '#5A6175',
  outlineStyle = styles.outlineStyle,
  ...rest
}: ControlledInputProps<T>) => {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({ control, name, rules });

  const handleChange = useCallback(
    (value: PathValue<T, Path<T>>) => {
      if (mask === undefined) {
        onChange(value);
      } else {
        onChange(mask(value) as PathValue<T, Path<T>>);
      }
    },
    [mask, onChange],
  );

  return (
    <View>
      <TextInput
        mode={mode}
        ref={ref}
        autoCapitalize="none"
        value={value}
        onChangeText={handleChange as TextInputProps['onChangeText']}
        onBlur={onBlur}
        placeholderTextColor={placeholderTextColor}
        outlineColor={outlineColor}
        outlineStyle={outlineStyle}
        activeOutlineColor={activeOutlineColor}
        {...rest}
      />
      <HelperText
        visible={!!error?.message}
        style={styles.errorText}
        type="error">
        {error?.message}
      </HelperText>
    </View>
  );
};

Input.Icon = TextInput.Icon;
Input.Affix = TextInput.Affix;

const styles = StyleSheet.create({
  outlineStyle: {
    backgroundColor: '#FFFFFF80',
  },
  errorText: {
    color: 'rgb(186, 26, 26)',
  },
});
