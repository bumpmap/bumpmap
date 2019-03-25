export const initialState = {
  menus: {
    left: false,
    right: false,
  },
  night: false,
}

export const layout = {
  state: { ...initialState }, // initial state
  reducers: {
    // handle state changes with pure functions
    openMenu(state, payload) {
      switch (payload) {
        case 'left': {
          return {
            ...state,
            menus: { ...state.menus, left: true },
          }
        }
        case 'right': {
          return {
            ...state,
            menus: { ...state.menus, right: true },
          }
        }
        default: {
          return { ...state }
        }
      }
    },
    closeMenu(state, payload) {
      switch (payload) {
        case 'left': {
          return {
            ...state,
            menus: { ...state.menus, left: false },
          }
        }
        case 'right': {
          return {
            ...state,
            menus: { ...state.menus, right: false },
          }
        }
        default: {
          return { ...state }
        }
      }
    },
    // handle state changes with pure functions
    toggleMenu(state, payload) {
      switch (payload) {
        case 'left': {
          return {
            ...state,
            menus: { ...state.menus, left: !state.menus.left },
          }
        }
        case 'right': {
          return {
            ...state,
            menus: { ...state.menus, right: !state.menus.right },
          }
        }
        default: {
          return { ...state }
        }
      }
    },
  },
}

export default {
  layout,
}
