import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './feature.css';

const Feature = () => {
  return (
    <section id="features" className="features-wrapper">
        <div className="feature-title">
          <h2>Powerful Features for Your Business</h2>
          <p>
            Everything you need to manage your inventory, customers, and sales
            effectively
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon="boxes" className='feature-icon' />
            <h3>Inventory Tracking</h3>
            <p>Real-time inventory mangaement with low stock alert system.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon="boxes" className='feature-icon' />
            <h3>Customer Management</h3>
            <p>Track customer purchases, preferences, and history to build better relationships.</p>
          </div>
        </div>
      </section>
  )
}

export default Feature