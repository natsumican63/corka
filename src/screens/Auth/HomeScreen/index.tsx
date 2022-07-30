import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { RootTabScreenProps } from '../../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePosts } from '../../../utils/model/posts/query';
import { Colors } from '../../../constants/Colors';

export const HomeScreen = ({ navigation }: RootTabScreenProps<'HomeScreen'>) => {
  const { data } = usePosts();
  const numColumns = 3;
  const width = Dimensions.get('window').width / numColumns;
  const height = width * 1.3;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ margin: 2 }}
        numColumns={numColumns}
        data={data}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', marginVertical: 100 }}>
            <Text style={{ fontWeight: 'bold' }}>投稿がありません</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync(item.url);
            }}
            key={item.id}
            style={{
              marginHorizontal: 1,
              marginVertical: 4,
              width: width,
              height: height,
              backgroundColor: 'white',
              borderRadius: 4,
              overflow: 'hidden',
              shadowColor: Colors.grey4,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
            }}
          >
            <View>
              <Image source={{ uri: item.image }} resizeMode={'cover'} style={{ width: '100%', height: height / 2 }} />
            </View>
            <View style={{ flex: 1, padding: 4 }}>
              <Text numberOfLines={4}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey0,
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
