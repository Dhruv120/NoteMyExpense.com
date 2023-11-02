import React,{useState,useEffect} from 'react'
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../Components/Spinner';
import Success from './Success';


const Login = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success(<div><Success/></div>);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("User Do not Exists");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page ">
      <h2 className='text-center' style={{textAlign:'center',color:'#00C4FF',fontWeight:'bolder',paddingTop:50}}>Welcome to NoteMyExpense.com</h2>
    <div className="register_box" style={{marginTop:80}}>
  
        <Form layout="vertical" onFinish={submitHandler}>
          
          <h2 style={{textAlign:'center',color:'yellow',fontWeight:'bolder'}}>Login Here</h2>

          <h4 style={{color:'white'}}>Email</h4>
          <Form.Item  name="email">
            <Input type="email" />
          </Form.Item>

          <h4 style={{color:'white'}}>Password</h4>
          <Form.Item  name="password">
            <Input type="password" />
          </Form.Item>

          <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <Link to="/register"><h5>Not a user ? Click Here to register</h5></Link>
            <br />
            <button className="btn" style={{backgroundColor:'#16FF00',fontWeight:'bolder'}}>Login</button>
          </div>
        </Form>
        </div>
      </div>
  )
}

export default Login