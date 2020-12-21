import React, {useState, useEffect,useRef} from 'react'
import { MyGlobalContext } from './unit-22/MyGlobalContext'
import UserList from './unit-23/UserList'
import axios from 'axios'
import 'antd/dist/antd.css';
import TestUseMemo from './unit-23/TestUseMemo'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const h1 = useRef(null)
  const [loading, setLoading] = useState(true)

  const [gContext, setGContext] = useState({
    user: null
  })

  //Css loading
  const loadingCss = css`
  display: block;             
  border-color: red;
`;

  const getCurrentUser = id => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        // console.log(response)
        const user = response.data
        setGContext({
          user
        })
        setLoading(false)
      })
  }

  useEffect(()=>{
    getCurrentUser(2)

  }, [])

  useEffect(()=>{
    console.log(h1)

  }, [h1])

  return (
    <MyGlobalContext.Provider value={gContext}>
      {
        // !loading && 
        // <UserList />
      }
      {/* <ClipLoader
        css={loadingCss}
        size={150}
        color={"#123abc"}
        loading={loading}/> */}
        <h1 ref={h1}>Buoi 23</h1>
        {
          // gContext.user && <UserList /> 
        }
       <TestUseMemo/>
    </MyGlobalContext.Provider>
    
  );
}

export default App;
