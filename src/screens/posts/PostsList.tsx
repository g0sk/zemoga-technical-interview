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
import {Post} from './Post';
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{`Posts (${allPosts.length})`}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => dispatch(fetchAllPosts())}>
              <Icon name="albums" color="black" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeAllPosts())}>
              <Icon name="trash-bin" color="black" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          ref={flatListRef}
          data={allPosts}
          renderItem={({item, index}) => (
            <Post post={item} index={index} navigation={navigation} />
          )}
          contentContainerStyle={styles.list}
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
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  list: {
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
    minWidth: 70,
    justifyContent: 'space-between',
  },
});
