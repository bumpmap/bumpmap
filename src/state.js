import { init } from '@rematch/core'
import { route } from '@/models/route'
import { createLogger } from 'redux-logger'
import { withDefaultReducers } from 'rematch-default-reducers'

const logger = createLogger({
  collapsed: true,
})

const middlewares = [logger]

export const store = init({
  models: withDefaultReducers({
    route,
  }),
  redux: {
    middlewares,
  },
})

export const { dispatch } = store

export default { store, dispatch }
