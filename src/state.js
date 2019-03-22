import { init } from '@rematch/core'
import * as models from '@/models'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
})

const middlewares = [logger]

export const store = init({
  models,
  redux: {
    middlewares,
  },
})

export const { dispatch } = store

export default { store, dispatch }
