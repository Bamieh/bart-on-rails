import React from 'react'

export class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {routeParams, BartReq} = this.props;
    BartReq(routeParams);
  }

  render() {
    const {schedule} = this.props;
    console.log('schedule', schedule)
    if(schedule && schedule.length) {
      return (
        <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Origin Time</th>
                <th>Destination Time</th>
                <th>Total Trip Time (minutes)</th>
                <th>Fare</th>
              </tr>
            </thead>
            <tbody>
              {schedule && schedule.map((entry, key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td><b>{entry.origTimeMin} </b>{entry.origTimeDate}</td>
                  <td><b>{entry.destTimeMin} </b>{entry.destTimeDate}</td>
                  <td>{entry.tripTime}</td>
                  <td>{entry.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
      )
    }
    return <div>Loading Data..</div>
  }
}

Table.propTypes = {
  schedule     : React.PropTypes.array.isRequired,
  BartReq : React.PropTypes.func.isRequired,
}

export default Table
