const initialState = {
    user: null,
    loggedIn: false,
    loggingIn: false,
    loginError: false
};

export const user = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_PENDING': {
            return {...state, 
                loggingIn: true,
                loggedIn: false,
                loginError: false
            };
            break;
        }
        case 'LOGIN_SUCCESS': {
            return {...state, 
                loggingIn: false, 
                loggedIn: true,
                loginError: false,
                user: action.payload.user
            };
            break;
        }
        case 'LOGIN_FAILURE': {
            return {...state, loggingIn: false, loginError: true};
            break;
        }
        case 'LOAD_TOKEN': {
            return {...state,
                loggingIn: false,
                loggedIn: true,
                loginError: false,
                user: action.payload.user
            }
            break;
        }
        case 'LOGOUT':{
            return initialState;
            break;
        }
        default: return state;
    }
};