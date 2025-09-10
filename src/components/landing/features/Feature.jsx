import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './feature.css';
import featuresData from '../../../data/landingPageData/featureData';

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
          {featuresData.map((feature)=>(
            <div className="feature-card" key={feature.id}>
                <FontAwesomeIcon icon={feature.iconName} className='feature-icon'/>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
            </div>
        ))}
        </div>
      </section>
  )
}

export default Feature