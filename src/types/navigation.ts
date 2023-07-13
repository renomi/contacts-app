import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Contacts: undefined;
  ContactDetail: {
    id: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
