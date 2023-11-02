

import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div>

      <div className="register-page">
      <br />
      <br />
      <br />
      <br />
      <div className="register_box" >
          
          <Form layout="vertical" style={{color:'white'}}  onFinish={submitHandler}>
            <h2 style={{color:'white',textAlign:'center',color:'yellow',fontWeight:'bolder'}}>Registration Form</h2>
            <br />
           
            <h4 style={{color:'white'}}>Name</h4>
            <Form.Item   name="name">
              <Input />
            </Form.Item>
            <h4 style={{color:'white'}}>Email</h4>
            <Form.Item  name="email">
              <Input type="email" />
            </Form.Item>
            <h4 style={{color:'white'}}>Password</h4>
            <Form.Item  name="password">
              <Input type="password" />
            </Form.Item>


            <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>

            <Link to="/login"><h5>Already a user ? Click Here to Login</h5></Link>
              <br />
            <button className="btn" style={{backgroundColor:'#16FF00',fontWeight:'bolder'}}>Register</button>
           </div>


          </Form>
          </div>
      </div>
    </div>
  );
};

export default Register;