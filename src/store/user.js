import axios from 'axios'

const GET_USER = 'GET_USER'

const getUser = user => ({type: GET_USER, user})

export const signupUser = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  let res
  try {
    res = await axios.post('api/users/', {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const loginUser = (
  email,
  password
) => async dispatch => {
  let res
  try {
    res = await axios.post('api/users/login/', {
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}

