import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import logo from '../../Assets/logo.png'
import { Button, Drawer } from 'antd'


const Header = () => {

  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);


  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg mynavbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" style={{color:'white',fontWeight:'bolder'}} to="/">
           <img src={logo} style={{marginLeft:20,marginRight:15}} width='7%' alt="" /> NoteMyExpense.com
          </Link>
         
          <ul style={{color:'white',display:'flex',justifyContent:'center',alignItems:'center'}} className="navbar-nav ms-auto mb-2 mb-lg-0">
          
            <li className="nav-item">
             <span style={{marginRight:10}}>User :</span>
              <button className="btn btn-success" style={{cursor:'pointer',borderRadius:"20px", marginRight:40,padding:7 ,fontSize:18 , letterSpacing:2 }} >
              {loginUser && loginUser.name}
              </button>
            </li>
            <li className="nav-item" style={{marginRight:30}}>
              <button className="btn btn-primary" onClick={logoutHandler}>
                Logout
              </button>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Header;