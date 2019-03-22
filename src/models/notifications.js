export const initialState = {
  count: 0,
}

export const notifications = {
  state: { ...initialState }, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      const { count } = state
      return { ...state, count: count + payload }
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      dispatch.notifications.increment(payload)
    },
  }),
}

export default {
  notifications,
}
