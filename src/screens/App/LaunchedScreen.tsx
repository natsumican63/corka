import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { RootTabScreenProps } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '../../components/elements/Spacer';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Layout';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/elements/Button';
import { useSignUpMutation } from '../../utils/model/user/mutation';

const MainImage = () => {
  return (
    <Image
      source={require('../../../assets/images/main.png')}
      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.4 }}
      resizeMode={'contain'}
    />
  );
};

export const LaunchedScreen = ({ navigation }: RootTabScreenProps<'SettingsScreen'>) => {
  const [signUpMutation, { loading, error }] = useSignUpMutation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignSelf: 'center' }}>
        <Spacer />
        <MainImage />
      </View>
      <View style={{ flex: 1 }}>
        <Spacer />
        <Button
          loading={loading}
          title={'はじめる'}
          onPress={async () => {
            await signUpMutation();
          }}
        />
        <Spacer size={10} />
        <Button title={'ログインしてつづける'} type={'clear'} onPress={() => navigation.navigate('SignInScreen')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
  },
});
