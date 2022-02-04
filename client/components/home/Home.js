import React from 'react'
import {connect} from 'react-redux'
import Camera from '../camera/Camera'

/**
 * COMPONENT
 */
export const Home = () => {
  // const {username} = props

  return (
    <div>
      <h3>Welcome this is the home</h3>
      < Camera />
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

export default Home
