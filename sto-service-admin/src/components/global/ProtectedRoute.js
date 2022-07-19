import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, onLogout, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (user && user.isAuthenticated) {
          return <Component user={user} onLogout={onLogout} {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;