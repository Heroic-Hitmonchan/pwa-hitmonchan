import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
// import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
// import { me } from './store'

/**
 * COMPONENT
 */
const Routes = () => {

//   const isLoggedIn = useSelector((state) => {
//     return !!state.auth;
// });

  return (
    <div>
      {/* {isLoggedIn ? ( */}
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
      {/* // ) : (
        //   <Switch>
        //     <Route path='/' exact component={ Login } />
        //     <Route path="/login" component={Login} />
        //     <Route path="/signup" component={Signup} />
        //   </Switch>
        // )} */}
    </div>
  )
}

export default Routes;

