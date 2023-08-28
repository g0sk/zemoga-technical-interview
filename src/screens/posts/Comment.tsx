import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {CommentType} from '../../store/postAsyncThunk';

export const Comment = ({comment}: {comment: CommentType}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{comment.name}</Text>
      </View>
      <View>
        <Text>{comment.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'green',
    borderWidth: 1,
  },
  title: {},
});
