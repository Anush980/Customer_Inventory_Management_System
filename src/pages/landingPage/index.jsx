import React from 'react'
import preview from "../../assets/Preview/DashboardPreview.png"
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button"
import LandingNavbar from '../../components/landing/navbar/LandingNavbar';
import "./landingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    
    <div className="landing-page-wrapper">
      <LandingNavbar/>
      <section className="hero">
<div className="hero-content">
    <div className="hero-left">
        <h2>Manage Your <span>Business Operations</span> with All-in-One Management</h2>
                <p>StockMate helps you manage customers, inventory, sales from one powerful
                     platform. Save time and manage your business in smart way.</p>
                <div className="hero-buttons">

                    <Button variant='primary' onClick={()=>{navigate("/login")}}>Login</Button>
                </div>
    </div>
    <div className="hero-right">
        <img src={preview} alt='dashboard-preview'/>
    </div>
</div>
      </section>
    </div>

    
  )
}

export default LandingPage