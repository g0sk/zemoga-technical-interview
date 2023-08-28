import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'react-redux';
import store from './src/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
