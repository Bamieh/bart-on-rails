// ------------------------------------
// Constants
// ------------------------------------
export const PUSH_TO_RECENT = 'PUSH_TO_RECENT'


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
    type    : PUSH_TO_RECENT,
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
  }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PUSH_TO_RECENT] : (state, action) => {
    console.log('state', state);
    const newState = state.slice(0);
    newState.unshift(action.payload);
    console.log('new state set')
    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];

export default function recentReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
