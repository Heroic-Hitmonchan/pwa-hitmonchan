import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/home/Home';
// import Camera from './components/camera/Camera';
// import Postcamera from './components/postCamera/Postcamera';
import SongGeneration from './components/player/Player'
import Uploadphoto from './components/uploadPhoto/Uploadphoto'
import Postupload from './components/postUpload/Postupload'

/**
 * COMPONENT
 */
const Routes = () => {

  return (
    <div>
      
      <Switch>
        <Route exact path="/home" component={Home} />
        {/* <Route path="/camera" component={Camera} /> */}
        {/* <Route path="/postcamera" component={Postcamera} /> */}
        <Route path="/songgeneration" component={SongGeneration} />
        <Route path="/uploadphoto" component={Uploadphoto} />
        <Route path="/postupload" component={Postupload} />
        <Redirect to="/home" />
      </Switch>
      
    </div>
  )
}

export default Routes;

