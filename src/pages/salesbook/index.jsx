import React from 'react'
import Layout from '../../components/ui/Layout/Layout'
import Pageheader from '../../components/ui/PageHeader/Pageheader';
import StatsCard from '../../components/ui/StatsCard/StatsCard';
import './salesbookPage.css';
import Table from "../../components/ui/table/table";


const SalesBookPage = () => {
  return (
    <Layout>
      <Pageheader title="Sales Management" btnTitle="Add" variant="sales"/>
    {/* Depreciated Feature
      <SalesDate/> */}
      <StatsCard value="10000" change="5" type="sales"/>
      <Table limit = "5"/>
      </Layout>
  )
}

export default SalesBookPage;