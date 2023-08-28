import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PostsList} from '../screens/posts/PostsList';
import {PostDetails} from '../screens/posts/PostDetails';

export type RootNavigator = {
  Posts: undefined;
  PostDetails: {postId: number};
};

const Stack = createNativeStackNavigator<RootNavigator>();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Posts" component={PostsList} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{headerShown: true, title: ''}}
      />
    </Stack.Navigator>
  );
}

const RootNavigator = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default RootNavigator;
