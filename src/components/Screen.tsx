import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Screen = ({children}: {children: ReactNode}) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};
