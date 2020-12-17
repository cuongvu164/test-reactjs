import React from 'react';
import MyRef from './unit-21/MyRef'
import MyHOC from './unit-21/HOC/MyHOC'
import { MyGlobalContext } from './context/MyGlobalContext'


class App extends React.Component {
  state = {
    value: {
      name: 'Nguyen Van A',
      age: 12
    }
  }
  

  changeGlobalContextName = event => {
    const { value } = event.target
    this.setState({
      value: {
        ...this.state.value,
        name: value
      }
    })
  }

  changeAge = value => {
    this.setState({
      value: {
        ...this.state.value,
        age: value
      }
    })
  }

  render() {
    const { value } = this.state
    
    return(
      <MyGlobalContext.Provider value={{ ...value,changeAge: this.changeAge}}>
        <MyRef/>

        <br/>
        <hr/>

        <MyHOC />

      <input
        onChange={this.changeGlobalContextName}/>
      </MyGlobalContext.Provider>
    )
  }
}

export default App;
