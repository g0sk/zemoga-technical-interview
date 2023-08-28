import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {CommentType, User} from '../../store/postAsyncThunk';
import Icon from 'react-native-vector-icons/Ionicons';

export const Comment = ({
  comment,
  user,
}: {
  comment: CommentType;
  user: User | null;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="person-circle-outline"
          color="grey"
          size={45}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.commentTitle}>
        <Text style={styles.commentTitleText}>{comment.name}</Text>
      </View>
      <View style={styles.commentBody}>
        <Text style={styles.commentBodyText}>{comment.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginRight: 20,
  },
  title: {},
  userInfo: {},
  commentTitle: {
    padding: 20,
  },
  commentTitleText: {
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  commentBody: {
    paddingHorizontal: 20,
  },
  commentBodyText: {
    textAlign: 'justify',
  },
});
