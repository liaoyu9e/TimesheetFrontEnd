const initialState = {
    fetching: false,
    fetched: false,
    updating: false,
    updated: false,
    // updateWeekTime: null,
    error: false,
    contracts: [],
    weekTimes: [],
};

export const weektime = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_TIMESHEET_PENDING': {
            return {...state, fetching: true};
            break;
        }
        case 'FETCH_TIMESHEET_SUCCESS': {
            return {...state, 
                fetching: false, 
                fetched: true, 
                contracts: action.payload.contracts,
                weekTimes : action.payload.weekTimes
            };
            break;
        }
        case 'FETCH_TIMESHEET_FAILURE': {
            return {...state, fetching: false, error: true};
            break;
        }
        case 'UPDATE_WEEKTIME_INITIAL': {
            return {...state, updated: false}
            break;
        }
        case 'UPDATE_WEEKTIME_PENDING': {
            return {...state, updating: true}
            break;
        }
        case 'UPDATE_WEEKTIME_SUCCESS': {
            for(let i = 0; i < state.weekTimes.length; i++) {
                if(state.weekTimes[i].weekId == action.payload.weekId) {
                    state.weekTimes[i] = action.payload;
                    break;
                }
            }
            return {...state, 
                updating: false, 
                updated: true
            }
            break;
        }
        case 'UPDATE_WEEKTIME_FAILURE': {
            return {...state, updating: false, error: true};
            break;
        }
        default: return state;
    }
};