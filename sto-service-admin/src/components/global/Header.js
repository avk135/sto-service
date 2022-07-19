import React from 'react';
import { Divider, Button, Popconfirm } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons'

const Header = (props) => {
  const { onLogout } = props;
  const { email, role } = props.user;

  const onLogoutClick = () => {
    onLogout();
    props.history.push('/login');
  }

  return (
    <>
      <div>
        <div className="pt-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0">Привет, {email}</h4>
          <Popconfirm
            title="Действительно выйти?"
            onConfirm={onLogoutClick}
            okText="Да"
            cancelText="Отмена"
          >
            <Button type="danger"><PoweroffOutlined /> Выйти</Button>
          </Popconfirm>
        </div>
        <Divider />
        {
          role === 'admin'
            ?
            (
              <>
                <div className="navigation">
                  <NavLink exact={true} activeClassName='is-active' to='/'>Филиалы</NavLink>
                  <NavLink activeClassName='is-active' to='/customers'>Клиенты</NavLink>
                  <NavLink activeClassName='is-active' to='/terminal'>Терминал</NavLink>
                </div>
                <Divider />
              </>
            )
            :
            null
        }
      </div>
    </>
  )
}

export default withRouter(Header);