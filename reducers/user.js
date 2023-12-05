export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_GRANTED_LANDINGS = 'SET_GRANTED_LANDINGS'
export const SET_USER_ROLE = 'SET_USER_ROLE'
export const SET_LOGGED = 'SET_LOGGED'

const initialState = {
    name: '',
    grantedLandings: [],
    logged: false,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.name }

        case SET_GRANTED_LANDINGS:
            return { ...state, grantedLandings: action.data }

        case SET_LOGGED:
            return { ...state, logged: action.data }

        default:
            return state
    }
}

export default user