import React, { Component } from 'react';
import Header from '../components/global/Header';
import { NavLink } from 'react-router-dom';
import { Divider,Button } from 'antd';

export default class FillialTerminal extends Component{
  constructor(props) {
    super(props);
  }

  state = {

  }

  render(){
    return(
      <div className="container" >
        <div className="row">
          <div className="сol-12 col-md-8 offset-md-2">
            <Header user={this.props.user} onLogout={this.props.onLogout} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="navigation">
              <NavLink exact={true} activeClassName='is-active' to='/fillial'>Запись на сегодня</NavLink>
              <NavLink activeClassName='is-active' to='/fillial-bookings'>Все записи</NavLink>
              <NavLink activeClassName='is-active' to='/fillial-terminal'>Терминал</NavLink>
            </div>
            <Divider />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <NavLink to='/fillial-terminal/tire-fitting' > 
              <Button size="large" type="primary" block>Шиномонтаж</Button>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink to='/fillial-terminal/conditioning' >
              <Button size="large" type="primary" block>Кондиционеры</Button>
            </NavLink>
            
          </div>
        </div>
        </div>
    )
  }
}