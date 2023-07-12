import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native-paper';

export type InputPros = TextInputProps & {
  mask?: (value: string) => string;
};
export type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;
export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

export type ControlledInputProps<T extends FieldValues> = InputPros &
  InputControllerType<T>;
