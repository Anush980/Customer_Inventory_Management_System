import React from 'react'
import Layout from '../../components/ui/Layout/Layout';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import Pageheader from '../../components/dashboard/PageHeader/Pageheader';

import FilterBar from "../../components/dashboard/Filterbar/FilterBar"; 
import CustomerCard from '../../components/customer/CustomerCard/CustomerCard';
import './customer.css';

const CustomerPage = () => {
  return (
      <Layout>
        <Pageheader title="Customer Management" btnTitle="Add"/>
      <StatsCard value="9" change='1' type="customer"/>
      <FilterBar/>
      <div className="customer-cards">
<CustomerCard/>
      </div>
      
      </Layout>
  )
}

export default CustomerPage;