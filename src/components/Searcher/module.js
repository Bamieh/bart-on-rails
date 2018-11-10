// ------------------------------------
// Constants
// ------------------------------------
export const ADD_RECENT = 'ADD_RECENT'


// Helper functions
//

function buildScheduleURL({arrivalStation, destinationStation, stamp}) {
  return `${arrivalStation}/${destinationStation}/${stamp}`;
}
function buildQueryText({arrivalStation, destinationStation, formatedStamp}) {
  return `${arrivalStation} to ${destinationStation} station, ${formatedStamp}`;
}


// ------------------------------------
// Actions
// ------------------------------------

export function addRecent ({queryText, queryURL}) {
  return {
    type    : ADD_RECENT,
    payload : {queryText, queryURL},
  }
}

export const pushRecent = (data) => {
  const queryURL = buildScheduleURL(data);
  const queryText = buildQueryText(data);

  return (dispatch, getState) => {
    dispatch(addRecent({
        queryText,
        queryURL,
      })
    );
    // window.location.replace(`/Schedule/${queryURL}`)
  }
}


export const actions = {
  pushRecent,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_RECENT] : (state, action) => {
    const newState = Object.assign({}, state);
    newState.recent = state.recent.slice(0);
    newState.recent.unshift(action.payload);
    console.log('new state set')
    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {recent: []};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
