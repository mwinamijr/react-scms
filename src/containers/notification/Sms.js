import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, Breadcrumb, Form, Select } from 'antd'
import axios from 'axios'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import TextArea from 'antd/lib/input/TextArea'

const Sms = () => {
  const [sendTo, setSendTo] = useState('')
  const [message, setMessage] = useState('')
  const nodeUrl = 'http://localhost:4001'

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("submitted!")
    //axios.post(`${nodeUrl}/api/sms/send`, { sendTo, message })
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>send SMS</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form onSubmit={submitHandler}>
          <Form.Item label='Send to'>
            <Select>
              <Select.Option value='teachers'>Teachers</Select.Option>
              <Select.Option value='parents'>Parents</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Message">
            <TextArea 
              rows={4}
              id="message"
              placeholder='Enter your message here'
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button className='primary' type='submit'>Send SMS</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Sms