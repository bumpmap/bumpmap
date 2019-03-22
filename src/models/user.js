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
  count: 0,
}

export const user = {
  state: { ...initialState },
  reducers: {
    increment(state, payload) {
      return state + payload
    },
  },
}

export default {
  user,
}
