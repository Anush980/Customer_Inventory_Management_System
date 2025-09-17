import React from 'react';
import "./inventoryStats.css";

const InventoryStats = () => {
  return (
    <div className="inventory-stats-wrapper">
      <div className="inventory-stats-header">
        <h3>Low Stock Items</h3>
      </div>

      {/* Single container for all stats */}
      <div className="inventory-stats">
        
        <div className="stat">
          <div className="image-wrapper">
            <img src='/Github.png' alt='img' width="45"/>
          </div>
          <div className="stat-info">
            <h4>Headphones</h4>
            <p>sku: Hp-45</p>
            <progress value="20" max="100" className='progress-bar'/>
          </div>
        </div>   

        <div className="stat">
          <div className="image-wrapper">
            <img src='/CIMS_logo.png' alt='img' width="45"/>
          </div>
          <div className="stat-info">
            <h4>Headphones</h4>
            <p>sku: Hp-45</p>
            <progress value="20" max="100" className='progress-bar'/>
          </div>
        </div>   

        <div className="stat">
          <div className="image-wrapper">
            <img src='/CIMS_logo.png' alt='img' width="45"/>
          </div>
          <div className="stat-info">
            <h4>Headphones</h4>
            <p>sku: Hp-45</p>
            <progress value="20" max="100" className='progress-bar'/>
          </div>
        </div>   

      </div>
    </div>
  )
}

export default InventoryStats;
