import React, { useState } from 'react'
import { Popconfirm, Table, Button, Form, Input } from 'antd'
import { v4 as uuid } from 'uuid'

const initData = [
  {
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: '32',
    address: 'London, Park Lane no. 1',
  },
]

const EditableCell = ({children, editing, dataIndex}) => {
  return <td>
    {
      editing ? (
        <Form.Item name={dataIndex}>
          <Input />
        </Form.Item>
      ) : (
        children
      )
    }
  </td>
}

const MyTable = () => {
  const [form] = Form.useForm()
  const [items, setItems] = useState(initData)
  const [editingKey, setEditingKey] = useState('')

  const handleDelete = key => {
    const newItems = items.filter(item => item.key !== key)
    setItems([...newItems])
  }

  const isEditing = (record) => record.key === editingKey;

  const edit = record => {

  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
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
          <Button onClick={() => edit(record)}>Edit</Button>

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
      }
    ])
  }

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