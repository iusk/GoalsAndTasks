import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import AppContainer from './navigation/navigation'
import combinedReducers from './data/reducers'

const store = createStore(combinedReducers)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
