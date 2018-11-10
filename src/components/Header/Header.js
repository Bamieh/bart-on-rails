import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import Searcher from '../Searcher'

export const Header = () => (
  <div>
    <h1>BART Public Transportation</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/search' activeClassName='route--active'>
      Search
    </Link>
    <Searcher />
  </div>
)

export default Header
