export const initialState = {
  exists: false,
  id: '',
  data: {
    alias: '',
    slug: '',
    email: '',
    isAdmin: false,
  },
  banned: false,
}

export const user = {
  state: { ...initialState }, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      const { count } = state
      return { ...state, count: count + payload }
    },
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.user.increment(payload)
    },
  }),
}

export default {
  user,
}
