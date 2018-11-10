import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'


export class CoreLayout extends React.Component {
  render() {
    const {children} = this.props;
    console.log('this.props;', this.props)
    return (
      <div className='container text-center'>
        <Header />
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
