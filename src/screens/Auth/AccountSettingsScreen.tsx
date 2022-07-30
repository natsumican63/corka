import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/elements/Button';

import { RootStackScreenProps } from '../../types';
import { useLinkingAccoutMutation } from '../../utils/model/user/mutation';
import { useUser } from '../../utils/model/user/query';

export const AccountSettingsScreen = ({ navigation }: RootStackScreenProps<'AccountSettingsScreen'>) => {
  const { user } = useUser();
  const [linkingAccountMutation, { loading, error }] = useLinkingAccoutMutation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  return (
    <SafeAreaView style={{ paddingHorizontal: 10 }}>
      {user?.isAnonymous ? (
        <>
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
                await linkingAccountMutation({ email, password });
                if (error) {
                  Alert.alert('このメールアドレスは既に登録されています');
                  return;
                } else {
                  Alert.alert('アカウント連携が完了しました');
                }
                navigation.goBack();
              }
            }}
            title={'保存'}
          />
        </>
      ) : (
        <>
          <Text>アカウント連携済み</Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
