import React from 'react';
import Input from './Input'
import MyHOCContext from './MyHOCContext' //import context tu` file myhoccontext


export default class MyHOC extends React.Component {
  state = {
    student: {
      name: 'Nguyen Van C',
      score: 9
    }
  }

  render() {
    return (
      <>
        <h1>Sử dụng HOC trong reactjs</h1>

        <MyHOCContext.Provider value={this.state.student}>
          <Input
            max={10}
            type="text"
            label="Nhap name"/>

          <br></br>



          <Input
            type="number"
            label="Nhap tuoi"
            max={20}
          />
      </MyHOCContext.Provider>
      </>
    )
  }
}