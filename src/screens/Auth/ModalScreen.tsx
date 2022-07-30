import { Button, Icon, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Header } from '@react-navigation/elements';
import { RootStackScreenProps } from '../../types';
import { useAddPostMutation } from '../../utils/model/posts/mutation';

export default function ModalScreen({ navigation }: RootStackScreenProps<'Modal'>) {
  const [url, setUrl] = useState<string>();
  const [addPost, { loading }] = useAddPostMutation();

  return (
    <View style={styles.container}>
      <Header
        headerStyle={{ height: 50 }}
        title={''}
        headerRight={() => (
          <Icon name="close" size={25} style={{ paddingHorizontal: 10 }} onPress={() => navigation.goBack()} />
        )}
      />
      <Input onChangeText={(text) => setUrl(text)} placeholder={'https://example.com/'} />
      <Button
        loading={loading}
        disabled={!url}
        title="保存"
        onPress={async () => {
          if (!url) return;
          await addPost({ url });
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
