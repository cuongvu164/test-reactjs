import React from 'react';
import Counter from './Counter'

class MyRef extends React.Component {
  constructor() {
    super()
    this.myH2 = React.createRef()
    this.myCounter = React.createRef()
  }

  state = {

  }

  componentDidMount() {
    this.changeH2Color()
    console.log(this.myCounter)
  }

  increment = () => {
      this.myCounter.current.increment()
  }

  backgroundColorChange = () => {
    const h2 = window.document.querySelector('h2')
    h2.style.background = 'pink'
  }

  changeH2Color = () => {
    console.log(this.refs)

    const h2 = this.myH2.current
    // const h2 = this.refs.myH2
    // const h2 = window.document.querySelector('h2')
    if (!h2.style.background || h2.style.background === 'red') {
      h2.style.background = 'green'
    } else {
      h2.style.background = 'red'
    }
  }

  render() {
    
    return (      
      <div>
        <h1>Sử dụng ref trong reactjs</h1>

        <h2 ref= { this.myH2 }>hello</h2>
        
        <button onClick={ this.changeH2Color }>Thay doi mau` h2</button>
        <Counter ref = { this.myCounter }/>

        <hr></hr>

        <button onClick={this.increment}>INCREMENT by Parent</button>
        </div>
        
    )
  }
}

export default MyRef