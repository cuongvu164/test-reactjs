import React, { useState, useEffect, useMemo } from 'react';

const TestUseMemo = props => {
  const [count, setCount] = useState(1)
  const [name] = useState('Nguyen Van A')

  useMemo(() => {
    console.log('use Memo')
    return name
  },[name])
  
  useEffect(() => {
    console.log('use Effect')
    return name
  },[name])

  return (
    <>
      <h1>Test Use Memo</h1>
      <h1>Count:{count}</h1>
      <button onClick={() => setCount(count +1)}>INCREMENT</button>
    </>
  )
}


export default TestUseMemo