import React from 'react';
import {Post} from '../../hooks/posts';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type RootNavigator} from '../../navigation/RootNavigator';

export function PostListItem({
  post,
  index,
  navigation,
}: {
  post: Post;
  index: number;
  navigation: NativeStackNavigationProp<RootNavigator, 'Posts'>;
}) {
  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => navigation.navigate('PostDetails')}>
      <View>
        <Text>{post.title}</Text>
        <Text>{post.body}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
});
