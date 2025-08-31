import React from 'react';
import "./quickStats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuickStats = () => {
  return (
   <div className="quick-stats-wrapper">
                        <div className="quick-stats-header">
                            <h3>Quick Stats</h3>
                        </div>
                        
                        <div className="quick-stats">
                            <div className="stat">
                                <div className="stat-icon sales">
                                    <FontAwesomeIcon icon="dollar-sign"/>
                                </div>
                                <div className="stat-info">
                                    <h4>Monthly Revenue</h4>
                                    <p>Rs. 24,589 (12.5% increase)</p>
                                </div>
                            </div>
                            
                            <div className="stat">
                                <div className="stat-icon customers">
                                    <FontAwesomeIcon icon="user"/>
                                </div>
                                <div className="stat-info">
                                    <h4>Customers</h4>
                                    <p>48 (5.2% increase)</p>
                                </div>
                            </div>
                            
                            <div className="stat">
                                <div className="stat-icon inventory">
                                    <FontAwesomeIcon icon="box"/>
                                </div>
                                <div className="stat-info">
                                    <h4>Products Sold</h4>
                                    <p>1,245 items this month</p>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default QuickStats