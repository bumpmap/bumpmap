import { init } from '@rematch/core'
import { user, initialState } from '@/models/user'

describe('models/user', () => {
  it('exists', () => {
    expect(user).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(user.state).toEqual(initialState)
    const store = init({
      models: { user },
    })
    const result = store.getState()
    expect(result.user).toEqual(initialState)
  })
})
