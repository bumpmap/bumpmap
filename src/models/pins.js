import { fetchAllPins } from '@/components/home/fake-pins.js'

export const initialState = {
  all: [],
}

export const pins = {
  state: { ...initialState }, // initial state
  // reducers: {
  //   // handle state changes with pure functions
  //   increment(state, payload) {
  //     const { count } = state
  //     return { ...state, count: count + payload }
  //   },
  // },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchAll(payload, rootState) {
      const all = await fetchAllPins()
      dispatch.pins.setAll(all)
    },
  }),
}

export default {
  pins,
}
