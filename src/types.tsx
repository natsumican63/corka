import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AppStackParamList = {
  LaunchedScreen: undefined;
  SignInScreen: undefined;
};

export type AuthStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AccountSettingsScreen: undefined;
  Modal: undefined;
};

export type RootTabParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

export type RootStackParamList = AppStackParamList & AuthStackParamList;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
