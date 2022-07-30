import React from 'react';
import { Alert, Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { Feather } from '@expo/vector-icons';
import { HomeScreen } from '../screens/Auth/HomeScreen';
import { RootStackScreenProps } from '../types';
import { SettingsScreen } from '../screens/Auth/SettingsScreen';

export const BottomTabNavigator = ({ navigation }: RootStackScreenProps<'Root'>) => {
  return (
    <CurvedBottomBar.Navigator
      screenOptions={{ headerShown: false }}
      style={styles.bottomBar}
      height={55}
      circleWidth={55}
      bgColor="white"
      initialRouteName="HomeScreen"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircle}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Modal')}
          >
            <Feather name={'plus'} color="white" size={25} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather
            name={routeName === 'HomeScreen' ? 'home' : 'settings'}
            size={25}
            color={routeName === selectedTab ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      )}
    >
      <CurvedBottomBar.Screen name="HomeScreen" position="LEFT" component={HomeScreen} />
      <CurvedBottomBar.Screen name="SettingsScreen" component={SettingsScreen} position="RIGHT" />
    </CurvedBottomBar.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});
