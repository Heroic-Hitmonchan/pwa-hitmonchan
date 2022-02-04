import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {

  // const isLoggedIn = useSelector((state) => {
  //   return !!state.auth.id
  // })

  return (


    <div>
      <h1>moments</h1>
      <nav>
      <input type="file" accept="image/x-png,image/jpeg,image/gif"/>
        {/* {isLoggedIn ? ( */}
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
        </div>
        {/* ) : ( */}
        {/* <div> */}
        {/* The navbar will show these links before you log in */}
        {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        {/* </div> */}
        {/* )} */}
      </nav>
      <hr />
    </div>
  )
}


export default Navbar;
