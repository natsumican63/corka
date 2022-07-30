import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName } from 'react-native';
import { LaunchedScreen } from '../screens/App/LaunchedScreen';
import { SignInScreen } from '../screens/App/SignInScreen';
import { AccountSettingsScreen } from '../screens/Auth/AccountSettingsScreen';

import ModalScreen from '../screens/Auth/ModalScreen';

import { RootStackParamList } from '../types';
import { useUser } from '../utils/model/user/query';
import { BottomTabNavigator } from './BottomTabNavigator';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user, loading } = useUser();
  if (loading) return <ActivityIndicator />;
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="AccountSettingsScreen"
            component={AccountSettingsScreen}
            options={{ title: 'アカウント連携' }}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="LaunchedScreen" component={LaunchedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: 'ログイン' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
