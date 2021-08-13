import React from 'react'
import './App.css';
import MainLayout from 'views/mainlayout';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import DashboardMainLayout from 'admin/mainlayout';
import SigninPage from 'views/signin';
import SignupPage from 'views/signup';

function App() {

  return (
    <div>
      <Router>
        <Switch>         
          <Route exact path="/signin">
            <SigninPage/>
          </Route>  
          <Route exact path="/signup">
            <SignupPage/>
          </Route>
          <PrivateRoute path="/admin">
            <DashboardMainLayout/>
          </PrivateRoute>
          <Route path="/">
            <MainLayout/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


function PrivateRoute({ children,  isAuth, ...rest}) {
  let auth = false;
  const authinfo = JSON.parse(localStorage.getItem('userinfo'))?.id;
  const privateAdminID = ["61154c3d1cba360016f54ba1", "61161e26b1d2120016a9d62e", "61161eaab1d2120016a9d632", "61161f1bb1d2120016a9d636", "61161fa7b1d2120016a9d639"]
  if(privateAdminID.indexOf(authinfo)>=0) auth=true
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
