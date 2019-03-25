export const initialState = {
  exists: false,
  id: '',
  email: '',
  data: {
    alias: '',
    slug: '',
    isAdmin: false,
    banned: false,
  },
}

export const user = {
  state: { ...initialState },
}

export default {
  user,
}
