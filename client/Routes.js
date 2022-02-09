import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
// import { Login, Signup } from './components/AuthForm';
import Home from './components/home/Home';
import Camera from './components/camera/Camera';
import Postcamera from './components/postCamera/Postcamera';
import SongGeneration from './components/player/Player'
import Uploadphoto from './components/uploadPhoto/Uploadphoto'
import Postupload from './components/postUpload/Postupload'
import History from './components/list/History' 
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
        <Route exact path="/home" component={Home} />
        <Route path="/camera" component={Camera} />
        <Route path="/postcamera" component={Postcamera} />
        <Route path="/songgeneration" component={SongGeneration} />
        <Route path="/uploadphoto" component={Uploadphoto} />
        <Route path="/postupload" component={Postupload} />
        <Route path="/history" component={History} />
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

