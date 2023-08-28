import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CommentType,
  deletePost,
  fetchPostComments,
  fetchPostDetails,
} from '../../store/postAsyncThunk';
import {RootState, useAppDispatch} from '../../store';
import {useSelector} from 'react-redux';
import {Screen} from '../../components/Screen';
import {Comment} from './Comment';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootNavigator} from '../../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

export const PostDetails = ({
  navigation,
  route,
}: NativeStackScreenProps<RootNavigator, 'PostDetails'>) => {
  const dispatch = useAppDispatch();
  const {comments, post, user, loading} = useSelector(
    (state: RootState) => state.post,
  );

  useEffect(() => {
    if (route.params?.postId) {
      dispatch(fetchPostDetails(route.params.postId));
    }
  }, [dispatch, route.params.postId]);

  const removePost = async () => {
    await dispatch(deletePost(route.params.postId)).then(() =>
      navigation.navigate('Posts'),
    );
  };

  return (
    <Screen>
      <View style={styles.postDetails}>
        <View>
          <Text style={styles.postTitle}>{post?.title}</Text>
          <Text style={styles.postBody}>{post?.body}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
          <Text>{user?.phone}</Text>
        </View>
        <TouchableOpacity onPress={() => removePost()}>
          <Icon name="trash" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        renderItem={({item}: {item: CommentType}) => (
          <Comment comment={item} user={user} />
        )}
        onEndReachedThreshold={0.5}
        onRefresh={() => dispatch(fetchPostComments(1))}
        onEndReached={() => dispatch(fetchPostComments(1))}
        refreshing={loading}
        keyExtractor={item => item.id.toString()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  postDetails: {
    padding: 20,
  },
  userInfo: {
    marginVertical: 15,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'justify',
    marginBottom: 10,
  },
  postBody: {
    textAlign: 'justify',
  },
});
