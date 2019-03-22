import { init } from '@rematch/core'
import { route } from '@/models/route'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
})

const middlewares = [logger]

export const store = init({
  models: {
    route,
  },
  redux: {
    middlewares,
  },
})

export const { dispatch } = store

export default { store, dispatch }
