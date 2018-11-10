import React from 'react'
import { connect } from 'react-redux'
import { pushRecent } from '../../store/recent'

import { Link } from 'react-router'

import Dropdown from '../Dropdown'
import stations from './stations.json'

import moment from 'moment'

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onArrivalStationChange = this.onArrivalStationChange.bind(this);
    this.onDestinationStationChange = this.onDestinationStationChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      arrivalStation: undefined,
      destinationStation: undefined,
      date: moment().format('YYYY-MM-DDTHH:mm'),
    }
  }
  onDateChange({currentTarget:{value:date}}) {
    this.setState({date})
  }
  onArrivalStationChange({value:arrivalStation}) {
    this.setState({arrivalStation})
  }
  onDestinationStationChange({value:destinationStation}) {
    this.setState({destinationStation})
  }
  submit() {
    const {pushRecent} = this.props;
    const {arrivalStation, destinationStation, date} = this.state;
    const momentDate = date && moment(date, 'YYYY-MM-DDTHH:mm');
    if(arrivalStation && destinationStation && momentDate && momentDate.isValid()) {
      console.log('push recent')
      pushRecent({
        arrivalStation,
        destinationStation,
        stamp: momentDate.format('X'),
        formatedStamp: momentDate.format('MM/DD/YYYY h:mma'),
        time: momentDate.format('h:mma'),
      });
    }
  }
  render() {
    const {arrivalStation, destinationStation, date} = this.state;
    const {recent} = this.props;
    return (
      <div className="row">
        <div className="col-xs-9">
          <div className="row">
            <div className="col-xs-6">
              <Dropdown
                placeholder="Arrival station"
                options={stations.options}
                onChange={this.onArrivalStationChange}
                value={arrivalStation}
                autofocus={true}
                clearable={false}
              />
            </div>
            <div className="col-xs-6">
              <Dropdown
                placeholder="Destination station"
                options={stations.options}
                onChange={this.onDestinationStationChange}
                value={destinationStation}
                clearable={false}
              />
            </div>
            <div className="col-xs-6">
              <input type="datetime-local" name="bdaytime" value={date} onChange={this.onDateChange}/>
            </div>
            <button className='btn btn-default' onClick={this.submit}>
              Check Schedule
            </button>
          </div>
        </div>
        <div className="col-xs-3">
          <ul>
          {recent && recent.map((item, key) => {
            const {queryText, queryURL} = item;
            return (
              <li key={key}>
              <Link to={`/schedule/${queryURL}`} activeClassName='route--active'>
                {queryText}
              </Link>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  pushRecent     : React.PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  pushRecent,
}

const mapStateToProps = (state) => {
  console.log('state!', state)
  return ({
    recent: state.recent,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
