import React, { useState,useEffect } from 'react'
import { Popconfirm, Table, Button, Form, Input, Select, Spin, } from 'antd'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { LoadingOutlined,SmileOutlined } from '@ant-design/icons';

const SUBJECT_LIST = [
  {id: 1,name: 'Reactjs'},
  {id: 2,name: 'Nodejs'},
  {id: 3,name: 'Vuejs'},
]

const initData = [
  {
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
    subject: 1
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: '32',
    address: 'London, Park Lane no. 1',
    subject: 2
  },
]

const EditableCell = ({ children, editing, dataIndex, inputType,currentSelected,selectList,isLoadingSubjects }) => {
  const isNormalMode = ['text', 'number','textarea', ].includes(inputType)
  const isSelectedMode = inputType === 'select'
  let NormalComponent = Input
  if (inputType === 'textarea') {
    NormalComponent = Input.TextArea
  }

  let renderEditing = null
  if (isNormalMode) {
    renderEditing = <NormalComponent type={inputType}/>
  } else if (isSelectedMode) {
    renderEditing = (
      <Select>
        {
          selectList.map(item => {
            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
          })
        }
      </Select>
    )
  }
  
  let renderReadOnly = children
  if (isSelectedMode) {
    if (isLoadingSubjects) {
      renderReadOnly =  <SmileOutlined  style={{ fontSize: 30 }} spin />
    } else {
      const item = selectList.find(item => item.id === currentSelected)
      // console.log('curent',currentSelected)
      renderReadOnly = item ? item.name : ''
    }
    
  }


  const normalEdit = <NormalComponent type={inputType}/>
  return <td>
    {
      editing ? (
        <Form.Item name={dataIndex}
        rules={
          [
            {
              requires: true,
              message: `nhap gi di pls${dataIndex}`
            }
          ]
        }>
          {renderEditing}
          {/* <Input type={inputType} /> */}
        </Form.Item>
      ) : (
        renderReadOnly
        )
    }
  </td>
}

const MyTable = () => {
  const [form] = Form.useForm()
  const [items, setItems] = useState(initData)
  const [editingKey, setEditingKey] = useState('')
  const [subjects,setSubjects] = useState([
    // {id:0,name:'Please choose a subject'}
  ])
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true)

  const handleDelete = key => {
    const newItems = items.filter(item => item.key !== key)
    setItems([...newItems])
  }

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    })

    const values = form.getFieldValue()
    // console.log(values)
    setEditingKey(record.key);
  }
  const save =async key => {
    const record = items.find(item => item.key === key)
    if (!record) {
      return
    }
    //validate
    const validateRult =await form.validateFields()
    console.log(validateRult)

    //get form data
    const value = form.getFieldValue()
    if (Array.isArray(value)){
      return
    }
    
    // console.log(value)

    //save data
    const index = items.findIndex(item => item.key === key)
    const item = items[index]

    const newData = { ...item, ...value }
    items[index] = newData
    setItems([...items])
    setEditingKey('')
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
      
      onCell: (record, index) => {
        return {
          record,
          inputType: 'text',
          dataIndex: 'name',
          editing: isEditing(record)
        }
      }
    },
    {
      title: 'age',
      dataIndex: 'age',
      onCell: (record, index) => {
        // console.log({record,index});
        return {
          record,
          inputType: 'number',
          dataIndex: 'age',
          editing: isEditing(record)
        }
      }
    },
    {
      title: 'address',
      dataIndex: 'address',
      onCell: (record, index) => {
        return {
          record,
          inputType: 'textarea',
          dataIndex: 'address',
          editing: isEditing(record)
        }
      }
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      onCell: (record, index) => {
        return {
          record,
          inputType: 'select',
          dataIndex: 'subject',
          selectList:subjects,
          isLoadingSubjects,
          currentSelected: record.subject,
          editing: isEditing(record)
        }
      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        if (!items.length) {
          return null
        }
        const editable = isEditing(record)
        return (<>
          {
            editable ? (
              <>
                <Button onClick={() => save(record.key)}>save</Button>
                <Button onClick={() => setEditingKey('')}>cancel</Button>
              </>
            ) : (
                <Button onClick={() => edit(record)}>Edit</Button>
              )

          }
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        </>)
      }
    },
  ]

  const addNewItem = () => {
    setItems([
      ...items,
      {
        key: uuid(),
        name: '',
        age: '',
        address: '',
        subject: '',
      }
    ])
  }

  const fetchSubject = () => {
    axios.get('https://jsonplaceholder.typicode.com/todosw')
      .then(() => {
        setSubjects(SUBJECT_LIST)
        setIsLoadingSubjects(false)
      })
  }

  useEffect(()=>{
    fetchSubject()
  },[])

  return <>
    <Button onClick={addNewItem}>Add new</Button>
    <Form form={form} component={false}>
      <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={items}
        columns={columns}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  </>
}

export default MyTable