import React from 'react'
import NavBar from '../navBar/NavBar'
import './MainLayout.css'
import PropTypes from "prop-types";


const MainLayout = ({ children }) => {
  return (
    <div className='divFather'>
      <NavBar />
      {children}
    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.object
};

export default MainLayout