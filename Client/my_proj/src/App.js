import React,{useState,useEffect} from "react";

import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage'
import GridPage from "./Pages/GridPage";

function App() {


  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(()=>setLoading(false),3000)
    
  }, [])


  return (
    <div>

    {
      loading?
        <LandingPage/> 
        : 
        <div>
            <Routes>
            <Route
              path="/"
              element={
                
                <ProtectedRoutes>
                    <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </div>
    }

 
    
     
    </div>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}


export default App;



