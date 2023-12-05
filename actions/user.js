import {
    SET_GRANTED_LANDINGS,
    SET_LOGGED,
    SET_USER_NAME,
} from '../reducers/user'

export const setUserName = (name) => {
    return { type: SET_USER_NAME, name }
}

export const setGrantedLandings = (data) => {
    return { type: SET_GRANTED_LANDINGS, data }
}

export const setLogged = (data) => {
    return { type: SET_LOGGED, data }
}