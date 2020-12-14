import React from 'react';
import Form from './Buoi20/Form/Form'
import UserList from './Buoi20/Form/UserList'
import './App.css';

class App extends React.Component {
  render() {
    return(
      <div>
        <Form/>
        <UserList/>
      </div>
    )
  }
}

export default App;
