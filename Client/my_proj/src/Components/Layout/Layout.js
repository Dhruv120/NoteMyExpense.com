import React,{useState,useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import LandingPage from "../../Pages/LandingPage";


const Layout = ({ children }) => {

  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(()=>setLoading(false),3000)
    
  // }, [])

  
  return (
    <div>

     
        <Header />
           <div className="content">{children}</div>
        <Footer /> 
  
     
      
  
    </div>
  );
};

export default Layout;