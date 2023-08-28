import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
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
      <View>
        <Text>{post?.title}</Text>
        <Text>{post?.body}</Text>
      </View>
      <View>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => removePost()}>
        <Icon name="trash" color="black" size={30} />
      </TouchableOpacity>
      <FlatList
        data={comments}
        renderItem={({item}: {item: CommentType}) => <Comment comment={item} />}
        onEndReachedThreshold={0.5}
        onRefresh={() => dispatch(fetchPostComments(1))}
        onEndReached={() => dispatch(fetchPostComments(1))}
        refreshing={loading}
        keyExtractor={item => item.id.toString()}
      />
    </Screen>
  );
};
