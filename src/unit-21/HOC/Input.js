import React from 'react';
import Card from './Card'
import { MyGlobalContext } from './../../context/MyGlobalContext'
// import MyHOC from './index'
import MyHOCContext from './MyHOCContext';


class Input extends React.Component {
  state = {
    value: '',
    isError: false,
    errorMessage: ''
  }

  componentDidMount() {
    console.log(this.context)
  }

  validate = (value) => {
    this.setState({
      errorMessage: ''
    })
    const { type, max } = this.props
     
    if(type === 'text' && value.length > max) {
      this.setState({
        errorMessage: `Do dai toi da la ${max}`
      })
    }

    if(type === 'number' && value > max) {
      this.setState({
        errorMessage: `Gia tri toi da la ${max}`
      })
    }
  }

  onChange = event => {
    const { value } = event.target

    this.validate(value)
    this.setState({
      value
    })
  }

  render() {
    return (
      <>
      <MyGlobalContext.Consumer>
        {
          globalContextValue => (
            <div>
              <label>{this.props.label}</label>

                <input
                  type={ this.props.type || 'text' }
                  onChange={this.onChange}/>

            {
              this.state.errorMessage &&
              <p>{this.state.errorMessage}</p>
            }

              <p>{ globalContextValue.name }</p>
            
              <MyHOCContext.Consumer>
                {
                  hocContextValue => (
                  <h2>{ hocContextValue.name }</h2>
                  )
                }
              </MyHOCContext.Consumer>

              <button onClick={() => {globalContextValue.changeAge(globalContextValue.age + 1)}}>Change Age</button>
            </div>
            
          )
        }
      
        
      </MyGlobalContext.Consumer>

      
      </>
    )
  }
}

export const InputInCard = MyComponent => class _InputInCard extends React.Component {
  render() {
    return (
      <>
        <Card>
          <MyComponent {...this.props}/>
        </Card>
      </>
    )
  }
}

//choc. den' 1 context
// Input.contextType = MyGlobalContext


export default InputInCard(Input)