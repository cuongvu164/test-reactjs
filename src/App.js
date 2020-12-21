import Form from './unit-22/Form'
import React, {useState}from 'react'

function App() {
  const [isShow, setIsShow] = useState(true)

  return (
    <div>
      {
        isShow &&
        <Form/>
      }
      <br/>
      <button onClick={() => setIsShow(!isShow)}>TOGGLE RENDER FORM</button>
    </div>
  );
}

export default App;
