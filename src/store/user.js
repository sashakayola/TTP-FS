import axios from 'axios'
// import history from '../history'

const GET_USER = 'GET_USER'

const getUser = user => ({type: GET_USER, user})


// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser.user))
//   } catch (err) {
//     console.error(err)
//   }
// }

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
    alert('user added')
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

