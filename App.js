import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import AppContainer from './navigation/navigation'
import combinedReducers from './data/reducers'

const store = createStore(combinedReducers)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // temporary database
    this.state = {
      projects : [ {Id: 1, name:'Maths', color:'#ABCDEF'} ],
      goals: []
    }
  }


  render() {
    return (
      <Provider store={store}>
        <AppContainer 
          screenProps = {{
            projects: this.state.projects,
            goals: this.state.goals
          }}
        />
      </Provider>
    );
  }
}
