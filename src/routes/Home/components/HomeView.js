import React from 'react'
import Logo from '../assets/Logo.png'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>BART on Rails</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={Logo} />
  </div>
)

export default HomeView
