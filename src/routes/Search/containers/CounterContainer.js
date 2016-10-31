import React from 'react'
import { connect } from 'react-redux'
import { BartReq } from '../modules/counter'

import { Link } from 'react-router'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Dropdown from '../../../components/Dropdown'
import stations from '../assets/stations.json'

import moment from 'moment'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

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
    const {BartReq} = this.props;
    const {arrivalStation, destinationStation, date} = this.state;
    const momentDate = date && moment(date, 'YYYY-MM-DDTHH:mm');
    if(arrivalStation && destinationStation && momentDate && momentDate.isValid()) {
      BartReq({
        arrivalStation,
        destinationStation,
        date: momentDate.format('MM/DD/YYYY'),
        time: momentDate.format('h:mma'),
      });
    }
  }
  render() {
    const {arrivalStation, destinationStation, date} = this.state;
    const {recent} = this.props;
    console.log('render recent::', recent)
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
          {recent.map((item, key) => {
            const {queryText, query, schedule} = item;
            return (
              <Link key={key} to={`/search?${query}`} activeClassName='route--active'>
                {queryText}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  BartReq     : React.PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  BartReq,
}

const mapStateToProps = (state) => {
  return ({
    recent: state.recent,
  })
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
