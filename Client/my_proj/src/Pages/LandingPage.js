import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <div className="containerland">
        <div className="contentland">
                <div className="square twitch" style={{marginBottom: 50}}>
                <span className="one" />
                <span className="two" />
                <span className="three" />
                <div className="circle">
                    <h2 className="DrugRadar"> NoteMyExpense.com
                    </h2>
                    <p style={{fontSize:24}} >Spending smartly is the new cool.</p>
                </div>
                </div>
               <div style={{fontSize:'30px',fontWeight:'bold'}}>
                  Developer : Dhruv Dholariya
               </div>
        </div>
</div>

  )
}

export default LandingPage