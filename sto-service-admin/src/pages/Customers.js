import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import Header from '../components/global/Header';

import api from '../api';

const columns = [
  {
    title: 'Имя',
    dataIndex: 'name'
  },
  {
    title: 'Телефон',
    dataIndex: 'phone'
  },
  {
    title: 'Филиал',
    dataIndex: 'fillial',
    render: (fillial) => {
      return (
        <span>
          {
            fillial
              ?
              fillial.address
              :
              null
          }
        </span>
      )
    }
  }
]

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const customers = await api.getCustomers();
    setCustomers(customers);
  }

  useEffect(() => {
    fetchCustomers();
  }, [])



  return (
    <div className="container">
      <div className="row">
        <div className="сol-12 col-md-8 offset-md-2">
          <Header user={props.user} onLogout={props.onLogout} />
        </div>
        <div className="col-12">
          <Table pagination={{ defaultPageSize: 50 }} scroll={{ x: 700 }} dataSource={customers} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  )
}

export default Customers;