import React, { Component } from 'react';
import { Typography, Divider, Input, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import api from '../api';

const { Title } = Typography;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: []
    }
  }

  setEmail = (email) => {
    this.setState({
      ...this.state,
      email
    })
  }

  setPassword = (password) => {
    this.setState({
      ...this.state,
      password
    })
  }

  setErrors = (errors) => {
    this.setState({
      ...this.state,
      errors
    })
  }

  onLogin = async () => {
    try {
      const { email, password } = this.state;

      let user = await api.login({ email, password });
      user.isAuthenticated = true;

      localStorage.setItem('user', JSON.stringify(user));

      this.props.onLogin(user);

      if (user.role === 'fillial') {
        this.props.history.push("/fillial");
        return;
      }

      this.props.history.push("/");
    } catch (e) {
      this.setErrors([...this.state.errors, e.message])
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12  col-xl-6 offset-xl-3">
            <Title>Войти в панель</Title>
            <Input
              onChange={e => {
                this.setEmail(e.target.value);
              }}
              value={this.state.email}
              size="large"
              placeholder="Введите ваш логин (E-mail)"
              prefix={<UserOutlined />}
            />
            <br />
            <Divider></Divider>
            <Input.Password
              onChange={e => {
                this.setPassword(e.target.value);
              }}
              value={this.state.password}
              size="large"
              placeholder="Введите ваш пароль"
              prefix={<KeyOutlined />} />
            <Button onClick={this.onLogin} className="mt-4" type="primary" block>Войти</Button>
            {
              this.state.errors.map((error, i) => (
                <div className="error-message mt-4" key={i}>
                  {error}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);