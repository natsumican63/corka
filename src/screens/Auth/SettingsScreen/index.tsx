import React from 'react';
import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from '@rneui/themed';
import { ListContainer } from '../../../components/elements/ListContainer';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/model/config';
import { Spacer } from '../../../components/elements/Spacer';

export const SettingsScreen = ({ navigation }: RootTabScreenProps<'SettingsScreen'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <ListContainer>
        <ListItem onPress={() => navigation.navigate('AccountSettingsScreen')}>
          <ListItem.Content>
            <ListItem.Title>アカウント連携</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <Spacer size={20} />
      </ListContainer>
      <ListContainer>
        <ListItem
          onPress={async () => {
            await signOut(auth);
          }}
        >
          <ListItem.Content>
            <ListItem.Title>ログアウト</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <Spacer size={20} />
      </ListContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
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
