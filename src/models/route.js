export const initialState = {
  name: '',
}

export const route = {
  state: { ...initialState }, // initial state
  reducers: {
    // handle state changes with pure functions
    update(state, payload) {
      if (payload !== state) {
        return payload
      }
      return state
    },
  },
}

export default {
  route,
}
