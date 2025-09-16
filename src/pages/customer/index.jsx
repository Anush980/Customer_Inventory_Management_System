import React, { useState } from 'react'
import Layout from '../../components/ui/Layout/Layout';
import StatsCard from '../../components/ui/StatsCard/StatsCard';
import Pageheader from '../../components/ui/PageHeader/Pageheader';
import { sortOptions } from "../../data/filterConfig/customerFilterConfigs";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import CustomerCard from '../../components/customer/CustomerCard/CustomerCard';
import './customer.css';



const CustomerPage = () => {
   const [sort, setSort] = useState("recent"); 
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState([]); 
  

  return (
      <Layout>
        <Pageheader title="Customer Management" btnTitle="Add" variant="customer"/>
      <StatsCard value="9" change='1' type="customer"/>
      <FilterBar
        filters={[
          { value: sort, onChange: setSort, options: sortOptions },
        ]}
        search={{
          value: searchText,
          onChange: setSearchText,
          placeholder: "Search customers...",
        }}
      />
      <div className="customer-cards">
<CustomerCard/>
      </div>
      
      </Layout>
  )
}

export default CustomerPage;