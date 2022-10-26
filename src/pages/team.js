import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/team.css'
import shruti from '../images/shruti.png'
import aakash from '../images/aakash.png'
import aakriti from '../images/aakriti.png'
import sagar from '../images/sagar.png'

const Team = () => {
const navigate = useNavigate()
    return (<div>
        
       <div className="team">
       <div className="team-member" onClick={()=>window.location.href='https://github.com/shrutigupta5555'}>
        <img src={shruti} alt="" className="pfp" />
        <p className="g-font-weight--700 g-color--dark g-font-size-18--xs g-margin-t-25--xs">Shruti Gupta</p></div>
        <div className="team-member" onClick={()=>window.location.href='https://github.com/aakzsh'}>
       <img src={aakash} alt="" className="pfp" />
        <p className="g-font-weight--700 g-color--dark g-font-size-18--xs g-margin-t-25--xs">Aakash Shrivastava</p></div>
        <div className="team-member" onClick={()=>window.location.href='https://github.com/sagban'}>
       <img src={sagar} alt="" className="pfp" />
        <p className="g-font-weight--700 g-color--dark g-font-size-18--xs g-margin-t-25--xs">Sagar Bansal</p></div>
        <div className="team-member" onClick={()=>window.location.href='https://github.com/aakriti1318'}>
       <img src={aakriti} alt="" className="pfp" />
        <p className="g-font-weight--700 g-color--dark g-font-size-18--xs g-margin-t-25--xs">Aakriti Aggarwal</p></div>
       </div>
   
    </div>)
}

export default Team;
