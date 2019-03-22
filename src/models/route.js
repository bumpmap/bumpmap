import router from '@/router'

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
  effects: dispatch => ({
    goTo(destination) {
      console.log(`\n\ngoing to ${destination.name}\n\n`)
      router.push(destination)
    },
  }),
}

export default {
  route,
}
