import XMLtoJSON from '../assets/xml2json';

import moment from 'moment'


// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
const BART_API = "http://api.bart.gov/api/sched.aspx?cmd=arrive&key=MW9S-E7SL-26DU-VV8V"


// ------------------------------------
// Helpers
// ------------------------------------

function buildBartURL({arrivalStation, destinationStation, stamp}) {
  const dateTime = moment.unix(stamp),
    date = dateTime.format('MM/DD/YYYY'),
    time = dateTime.format('h:mma');

  return `${BART_API}&orig=${arrivalStation}&dest=${destinationStation}&date=${date}&time=${time}`;
}


// ------------------------------------
// Actions
// ------------------------------------
export function updateSchedule(scheduleData) {
  return {
    type    : UPDATE_SCHEDULE,
    payload : scheduleData
  }
}

export const BartReq = (urlData) => {
  const query = buildBartURL(urlData);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      fetch(query)
      .then((response) => {
        console.log('got response')
        return response.text();
      })
      .then(function(xml) {
        try {
          const xml2json = new XMLtoJSON();
          const parsedJSON = xml2json.fromStr(xml);
          let error = parsedJSON.root.message.error;
          if(error) {
            console.log('BART Error:: ', error );
            reject(error)
          }
          const trips = parsedJSON.root.schedule.request.trip;
          const schedule = trips.reduce((acc, cur) => {
            return acc.push(cur['@attributes']), acc;
          }, []);
          dispatch(updateSchedule(schedule));

          resolve()
        } catch(e) {
          reject(e)
        }
      })
    })
  }
}


export const actions = {
  BartReq,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_SCHEDULE] : (state, action) => {
    return action.payload;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
