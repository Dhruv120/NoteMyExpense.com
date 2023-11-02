import React from 'react'
import { Button, Result } from 'antd';


const Success = () => {
  return (
    <Result
        status="success"
        title="Successfully Logged In"
        subTitle="Welcome to NoteMyExpense.com"
    />
  )
}

export default Success