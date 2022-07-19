import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import ProtectedRoute from './components/global/ProtectedRoute';


import Login from './pages/Login';
import Customers from './pages/Customers';
import Fillials from './pages/Fillials';
import FillialDashBoard from './pages/FillialDashBoard';
import FillialsDashBoardAllDates from './pages/FillialsDashBoardAllDates';
import AdminTerminal from './pages/AdminTerminal';
import FillialInfo from './pages/FillialInfo'
import FillialInfoBillings from './pages/FillialInfoBillings'
import FillialTerminal from './pages/FillialTerminal'
import FillialTerminalTireFitting from './pages/FillialTerminalTireFitting'
import FillialTerminalConditioning from './pages/FillialTerminalConditioning'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.setState({
        ...this.state,
        user
      });
    }
  }

  onLogin = async (user) => {
    this.setState({
      ...this.state,
      user
    });
  }

  onLogout = async () => {
    this.setState({
      ...this.state,
      user: {}
    });

    localStorage.removeItem('user');
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <ProtectedRoute user={user} onLogout={this.onLogout} path="/" exact component={Fillials} />
          <Route exact path="/login" component={() => <Login onLogin={this.onLogin} />} />
          <ProtectedRoute user={user} onLogout={this.onLogout} path="/customers" component={Customers} />
          <ProtectedRoute user={user} onLogout={this.onLogout} path="/terminal" component={AdminTerminal} />
          <ProtectedRoute user={user} onLogout={this.onLogout} path="/fillial" component={FillialDashBoard} />
          <ProtectedRoute user={user} onLogout={this.onLogout} path="/fillial-bookings" component={FillialsDashBoardAllDates}></ProtectedRoute>
          <ProtectedRoute exact user={user} onLogout={this.onLogout} path="/fillial-info/:id" component={FillialInfo}></ProtectedRoute>
          <ProtectedRoute exact user={user} onLogout={this.onLogout} path="/fillial-info/:id/:date" component={FillialInfoBillings}></ProtectedRoute>
          <ProtectedRoute exact user={user} onLogout={this.onLogout} path="/fillial-terminal" component={FillialTerminal}></ProtectedRoute>
          <ProtectedRoute exact user={user} onLogout={this.onLogout} path="/fillial-terminal/tire-fitting" component={FillialTerminalTireFitting}></ProtectedRoute>
          <ProtectedRoute exact user={user} onLogout={this.onLogout} path="/fillial-terminal/conditioning" component={FillialTerminalConditioning}></ProtectedRoute>
          
          {
            user.role === 'admin'
              ?
              <Redirect to="/" />
              :
              <Redirect to="/fillial" />
          }
        </BrowserRouter>
      </div >
    );
  }
}

export default App;
