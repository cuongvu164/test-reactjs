import React from 'react';
import MyRef from './unit-21/MyRef'
import MyHOC from './unit-21/HOC'
import { MyGlobalContext } from './context/MyGlobalContext'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: {
        name: 'Nguyen Van A',
        age: 12
      }
    }
  }
  render() {
    return(
      <MyGlobalContext.Provider value={this.state.value}>
        <MyRef/>

        <br></br>
        <hr></hr>

        <MyHOC />


      </MyGlobalContext.Provider>
    )
  }
}

export default App;
