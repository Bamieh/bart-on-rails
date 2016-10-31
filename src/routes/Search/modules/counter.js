import XMLtoJSON from '../assets/xml2json';

import Immutable from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_RECENT = 'ADD_RECENT'
import {LOCATION_CHANGE} from '../../../store/location';

// ------------------------------------
// Actions
// ------------------------------------

export function addRecent (queryText, query) {
  return {
    type    : ADD_RECENT,
    payload : {queryText, query},
  }
}


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */


const bartAPI = "http://api.bart.gov/api/sched.aspx?cmd=arrive&key=MW9S-E7SL-26DU-VV8V"
function buildBartURL({arrivalStation, destinationStation, date, time}) {
  return `orig=${arrivalStation}&dest=${destinationStation}&date=${date}&time=${time}`;
}
function queryText({arrivalStation, destinationStation, date, time}) {
  return `${arrivalStation} to ${destinationStation} station, ${date} ${time}`;
}

export const getSchedule = (reqData) => {

}
export const BartReq = (reqData) => {
  const query = buildBartURL(reqData);
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(`${bartAPI}&${query}`)
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
          const addToRecent = addRecent(queryText(reqData), query);
          console.log('dispatching');
          dispatch(addToRecent);
          resolve()
        } catch(e) {
          reject(error)
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
  // [LOCATION_CHANGE]: (state, action) => {
  //   const search = action.payload.search;
  //   console.log('search', search)

  //   return state;
  // },
  [ADD_RECENT] : (state, action) => {
    const map1.updateIn('recent', (arr) => arr.push('testtest'));

    // const newState = state.slice(0);
    // newState.unshift(action.payload);
    // console.log('newState', newState)
    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.Map({recent: Immutable.List});

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
