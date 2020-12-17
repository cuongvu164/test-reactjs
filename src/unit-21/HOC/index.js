import React from 'react';
import Input from './Input'



export default class MyHOC extends React.Component {
  render() {
    return (
      <>
        <h1>Sử dụng HOC trong reactjs</h1>
        <Input
          max="10"
          type="text"
          label="Nhap name"/>

        <br></br>
        


        <Input
          type="number"
          label="Nhap tuoi"
          max={10}
        />

      </>
    )
  }
}