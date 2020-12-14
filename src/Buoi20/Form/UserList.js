import React from 'react';
import axios from 'axios';

class UserList extends React.Component {
  state = {
    users: []
  }
  
  fetchData = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    // const response = await axios.post(`https://jsonplaceholder.typicode.com/users`,/*data*/)
    this.setState({
      users: response.data
    })

    console.log({response})
  }


  componentDidMount() {
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(response => {
    //     // this.setState({
    //     //   users: response.data
    //     // })
    //     return "xong then 1"
    //   })

    //   .then(data => {
    //     console.log('data o then 2')
    //   })
    //   .catch(error =>{
    //     console.log('loi' + error)
    //   })
    this.fetchData()
  }

  render() {
    const { users } = this.state
    return(
      <>
        <h1>Danh sách Users</h1>
        <ul>
          {
            users.map(user =>{
              return <li key={user.id}
              >
                {user.name}
              </li>
            })
          }
        </ul>
      </>
    )
  }
}

export default UserList