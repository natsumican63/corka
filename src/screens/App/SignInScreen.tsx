import React, { useState } from 'react';
import { Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignInMutation } from '../../utils/model/user/mutation';
import { RootStackScreenProps } from '../../types';
import { Button } from '../../components/elements/Button';
import { Alert } from 'react-native';
import { Spacer } from '../../components/elements/Spacer';

type SignInScreenProps = RootStackScreenProps<'SignInScreen'>;

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [signIn, { loading, error }] = useSignInMutation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Spacer />
      <Input
        placeholder="メールアドレス"
        autoFocus
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        placeholder="パスワード"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button
        loading={loading}
        disabled={!email || !password}
        onPress={async () => {
          if (email && password) {
            await signIn({ email, password });
            if (error) {
              Alert.alert('アカウント情報が正しくありません。メールアドレスとパスワードをご確認ください。');
            }
          }
        }}
        title={'ログイン'}
      />
      {/* <TouchableOpacity onPress={() => navigation.navigate('PasswordResetScreen')}>
        <Text style={{ textDecorationLine: 'underline', color: Colors.primary }}>パスワードを忘れましたか？</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};
