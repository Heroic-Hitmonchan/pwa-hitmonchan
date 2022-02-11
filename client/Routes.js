import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/home/Home';
// import Camera from './components/camera/Camera';
// import Postcamera from './components/postCamera/Postcamera';
import SongGeneration from './components/player/Player'
import Uploadphoto from './components/uploadPhoto/Uploadphoto'
import Postupload from './components/postUpload/Postupload'
import History from './components/list/History'
import Installpwa from './components/installPwa/installpwa'
import Aboutus from './components/aboutus/Aboutus';


/**
 * COMPONENT
 */
const Routes = () => {

  return (
    <div>
      <Installpwa />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/songgeneration" component={SongGeneration} />
        <Route path="/uploadphoto" component={Uploadphoto} />
        <Route path="/postupload" component={Postupload} />
        <Route path="/history" component={History} />
        <Route path="/aboutus" component={Aboutus} />
        <Redirect to="/home" />
      </Switch>
    </div>
  )
}

export default Routes;