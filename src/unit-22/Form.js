import React, { useState, useEffect } from 'react';

const Form = props => {
  const [ name, setName ] = useState('')
  const [ age, setAge ] = useState(0)
  const [ score, setScore ] = useState(0)
  // console.log(props)

  // useEffect(callback,optional co the? la` 1 arr)

  // useEffect(()=>{
  //   console.log('lần đầu render')
  // }, [])

  // useEffect(()=>{
  //   console.log('được render')
  // })

  useEffect(()=>{
    console.log('tên bị thay đổi');
    
    return () => {
      console.log('Form đã bị gỡ hỏi DOM')
    }

  }, [name, score])

  return (
    <>
      <h1>Tạo component bằng function</h1>
      <p>Nhập tên:</p>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <p>Nhập tuổi:</p>
      <input
        type="number"
        value={age}
        onChange={event => setAge(event.target.value)}
      />

      <p>Nhập điểm:</p>
      <input
        type="text"
        value={score}
        onChange={event => setScore(event.target.value)}
      />
    </>
  )
}

Form.defaultProps = {
  color: 'red'
}

export default Form