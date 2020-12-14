import React, { Component } from 'react'
import axios from 'axios'

class Form extends Component {
  constructor() {
    super()

    this.state = {
      form: {
        name: '',
        email: '',
        password: '',
        phone: '',
        age: '2',
        gender: 'female',
        hobbies: [],
        note: '',
        avatar: null
      },
      hobbies: [
        { id: 1, name: 'Football' },
        { id: 2, name: 'Reading' },
        { id: 3, name: 'Swimming' },
        { id: 4, name: 'Runing' }
      ]
    }
  }

  onChange = event => {
    const { value, name, type, files } = event.target
    let newValue = value

    if (type === 'checkbox') {
      const oldValue = this.state.form[name]
      const isExist = oldValue.includes(value)

      if (isExist) {
        newValue = oldValue.filter(item => item !== value)
      } else {
        newValue = [...oldValue, value]
      }
    }

    if (type === 'file') {
      const [avatar] = files
      newValue = avatar
    }

    this.setState({
      form: {
        ...this.state.form,
        [name]: newValue
      }
    })
  }

  submit = event => {
    event.preventDefault()
    const { form } = this.state

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('avatar', form.avatar)

    axios.post('/test-url', formData)
  }

  render() {
    const { form, hobbies } = this.state

    return (
      <>
        <h1>My form</h1>
        <form onSubmit={this.submit}>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  <input type="text" name="name" value={form.name} onChange={this.onChange} />
                </td>
              </tr>

              <tr>
                <td>Email:</td>
                <td>
                  <input type="email" name="email" value={form.email} onChange={this.onChange} />
                </td>
              </tr>

              <tr>
                <td>Password:</td>
                <td>
                  <input type="password" name="password" value={form.password} onChange={this.onChange} />
                </td>
              </tr>

              <tr>
                <td>Avatar:</td>
                <td>
                  <input type="file" name="avatar" onChange={this.onChange} />
                </td>
              </tr>

              <tr>
                <td>Phone:</td>
                <td>
                  <input type="text" name="phone" value={form.phone} onChange={this.onChange} />
                </td>
              </tr>

              <tr>
                <td>Age:</td>
                <td>
                  <select value={form.age} onChange={this.onChange} name="age">
                    <option value="1">1 tuổi</option>
                    <option value="2">2 tuổi</option>
                    <option value="3">3 tuổi</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>Gender:</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === 'male'}
                      onChange={this.onChange}
                    />
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === 'female'}
                      onChange={this.onChange}
                    />
                    Female
                  </label>
                </td>
              </tr>

              <tr>
                <td>Hobbies:</td>
                <td>
                  {
                    hobbies.map(hobby => {
                      return (
                        <label key={hobby.id}>
                          <input
                            type="checkbox"
                            name="hobbies"
                            value={hobby.id}
                            defaultChecked={form.hobbies.includes(hobby.id)}
                            onChange={this.onChange}
                          />
                          {hobby.name}
                        </label>
                      )
                    })
                  }
                </td>
              </tr>

              <tr>
                <td>Note:</td>
                <td>
                  <textarea value={form.note} onChange={this.onChange} name="note" />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <button onClick={this.submit}>Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </>
    )
  }
}

export default Form

