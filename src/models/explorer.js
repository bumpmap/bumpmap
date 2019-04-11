export const initialState = {
  addMode: false,
  welcome: true,
}

export const explorer = {
  state: { ...initialState }, // initial state
  reducers: {
    // handle state changes with pure functions
    toggleAddMode(state) {
      const { addMode } = state
      return { ...state, addMode: !addMode }
    },
  },
  // effects: dispatch => ({
  //   // handle state changes with impure functions.
  //   // use async/await for async actions
  //   async incrementAsync(payload, rootState) {
  //     await new Promise(resolve => setTimeout(resolve, 1000))
  //     dispatch.explorer.increment(payload)
  //   },
  // }),
}

export default {
  explorer,
}
