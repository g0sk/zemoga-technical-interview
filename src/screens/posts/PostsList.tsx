import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {Screen} from '../../components/Screen';
import {PostListItem} from './PostListItem';
import {type RootNavigator} from '../../navigation/RootNavigator';
import {RootState, useAppDispatch} from '../../store';
import {fetchAllPosts, fetchPosts} from '../../store/postAsyncThunk';
import {
  clearPosts,
  removeAllPosts,
  resetCurrentPage,
} from '../../store/postSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const ITEM_COUNT = 15;

export const PostsList = ({
  navigation,
}: {
  navigation: NativeStackScreenProps<RootNavigator, 'Posts'>['navigation'];
}) => {
  const {allPosts, currentPage, loading} = useSelector(
    (state: RootState) => state.post,
  );
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(fetchPosts({currentPage: 1, limit: ITEM_COUNT}));
    return () => {
      dispatch(clearPosts());
      dispatch(resetCurrentPage());
    };
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchPosts({currentPage, limit: ITEM_COUNT}));
    dispatch(clearPosts());
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerText}>{`Posts (${allPosts.length})`}</Text>
        <TouchableOpacity onPress={() => dispatch(removeAllPosts())}>
          <Icon name="trash-bin" color="black" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(fetchAllPosts())}>
          <Icon name="albums" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={allPosts}
        renderItem={({item, index}) => (
          <PostListItem post={item} index={index} navigation={navigation} />
        )}
        scrollEventThrottle={0}
        onEndReachedThreshold={2}
        initialNumToRender={ITEM_COUNT}
        /* onEndReached={() =>
          dispatch(fetchPosts({currentPage, limit: ITEM_COUNT}))
        } */
        refreshing={loading}
        onRefresh={() => onRefresh()}
        //onScroll={handleScroll}
        //onMomentumScrollEnd={handleSnap}
        keyExtractor={item => item.id}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    //position: 'absolute',
    //alignContent: 'center',
    //left: 0,
    //right: 0,
    width: '100%',
    //zIndex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
});
