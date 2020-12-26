import React, { useState, useEffect, useMemo,useReducer } from 'react';
const myReducer = (state, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

// view -> dispatch 1 ation -> reducer -> state moi'
const TestUseMemo = props => {
  const [count, setCount] = useState(1)
  const [name] = useState('Nguyen Van A')
  const [b, setB] = useState(2)
  const [a, setA] = useState(3)

  const [state, dispatch] = useReducer(myReducer, { count: 2,name: 'Nguyen Van A'})

  // useMemo(() => {
  //   console.log('use Memo')
  //   return name
  // },[name])
  
  // useEffect(() => {
  //   console.log('use Effect')
  //   return name
  // },[name])

  const c = useMemo(() => {
    console.log('useMemo dc goi.')
    return a+b
  },[a,b])

  console.log('sum',c)

  return (
    <>
      {/* <h1>Test Use Memo</h1>
      <h1>Count:{count}</h1>
      <h1>Sum: {c}</h1>
      <button onClick={() => setCount(count +1)}>INCREMENT COUNT</button> */}
      {/* <button onClick={() => setA(a +1)}>INCREMENT A </button> */}
      

      <h1>Count:{state.count}</h1>
      {/* <button onClick={() => dispatch({ type: 'INCREMENT'})}>INCREMENT COUNT</button>
      <button onClick={() => dispatch({ type: 'DECREMENT'})}>DECREMENT COUNT</button> */}

      <button onClick={() => dispatch({ type: 'INCREMENT', number: 1})}>INCREMENT COUNT</button>
      <button onClick={() => dispatch({ type: 'INCREMENT', number: 2})}>INCREMENT COUNT</button>

    </>
  )
}


export default TestUseMemo