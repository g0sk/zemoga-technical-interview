import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootNavigator} from '../../navigation/RootNavigator';
import type {Post} from '../../store/postSlice';
import {useAppDispatch} from '../../store';
import {addFavourite, removeFavourite} from '../../store/postSlice';
import Icon from 'react-native-vector-icons/Ionicons';

export function PostListItem({
  post,
  index,
  navigation,
}: {
  post: Post;
  index: number;
  navigation: NativeStackScreenProps<RootNavigator, 'Posts'>['navigation'];
}) {
  const dispatch = useAppDispatch();

  const setFavourite = () =>
    !post.favourite
      ? dispatch(addFavourite({post, index}))
      : dispatch(removeFavourite({post, index}));

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => navigation.navigate('PostDetails', {postId: post.id})}>
      <View>
        <View style={styles.postTitleContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
        </View>
        <View style={styles.postBodyContainer}>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setFavourite()}>
        <Icon
          name={!post.favourite ? 'star-outline' : 'star'}
          color="#c9b532"
          size={30}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  postTitleContainer: {
    height: 'auto',
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBodyContainer: {
    padding: 10,
  },
  postBody: {
    padding: 20,
  },
});
