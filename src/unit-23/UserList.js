import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Table,Tag,Button,Popconfirm,Tooltip } from 'antd'; 
import { MyGlobalContext } from '../unit-22/MyGlobalContext'
import { UserOutlined,EyeOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons'


function UserList() {

  const [users, setUsers] = useState([])
  const gContext = useContext(MyGlobalContext)
  const deleteUser = user => {
    console.log(user)
    const newUsers = users.filter(u => u.id !== user.id)
    setUsers([...newUsers])
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => {
        if (row.id === gContext.user.id) {
          <Tag
            closable={true}
            color="red">
              <UserOutlined /> 
              {name}
          </Tag>
        }
        return name
      }
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (cell,row) => {
        return (
          <>
            <Tooltip title="Xem chi tiet user" trigger="click">
              <Button shape="circle"><EyeOutlined/></Button>
            </Tooltip>
            
            <Button shape="circle"><EditOutlined/></Button>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => deleteUser(row)}
              onCancel={()=>{}}
              okText="Yes"
              cancelText="No"
            >
              <Button
                shape="circle"
                danger
              >
                <DeleteOutlined/>
              </Button>
        </Popconfirm>
            
            
          </>
        )
      },
      fixed: 'right'
    }
  ]

  useEffect(()=>{
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then((response => {
      setUsers(response.data)
    }))
  },[])

  return (
    <div>
      <h1>Danh Sách User</h1>
      <Table rowKey="id" dataSource={users} columns={columns} />
    </div>
  );
}

export default UserList;