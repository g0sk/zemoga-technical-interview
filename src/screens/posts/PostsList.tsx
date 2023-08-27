import React, {useEffect, useState} from 'react';
import {Screen} from '../../components/Screen';
import {Button, FlatList, View} from 'react-native';
import {Post, getPosts} from '../../hooks/posts';
import {PostListItem} from './PostListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootNavigator} from '../../navigation/RootNavigator';

export const PostsList = ({
  navigation,
}: {
  navigation: NativeStackScreenProps<RootNavigator, 'Posts'>;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = async () => {
    const _posts = await getPosts();
    setPosts(_posts);
  };
  return (
    <Screen>
      <View>
        <Button title="Get posts" onPress={() => retrievePosts()} />
      </View>
      <FlatList
        data={posts}
        renderItem={({item, index}) => (
          <PostListItem post={item} index={index} navigation={navigation} />
        )}
      />
    </Screen>
  );
};
