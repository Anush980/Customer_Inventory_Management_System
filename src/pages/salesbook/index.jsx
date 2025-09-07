import React from 'react'
import Layout from '../../components/ui/Layout/Layout'
import Pageheader from '../../components/dashboard/PageHeader/Pageheader';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import './salesbookPage.css';
import Table from "../../components/table/table";
import SalesDate from '../../components/sales/SalesDate';

const SalesBookPage = () => {
  return (
    <Layout>
      <Pageheader title="Sales Management" btnTitle="Add"/>
      <SalesDate/>
      <StatsCard value="10000" change="5" type="sales"/>
      <Table limit = "5"/>
      </Layout>
  )
}

export default SalesBookPage;