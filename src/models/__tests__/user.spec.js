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

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { user },
        })

        const initialValue = initialState.count
        store.dispatch.user.increment(3)
        const result1 = store.getState().user.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.user.increment(1000)
        const result2 = store.getState().user.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.user.increment(1000000)
        const result3 = store.getState().user.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { user },
        })

        await store.dispatch.user.incrementAsync(1)
        let userData = store.getState().user
        expect(userData.count).toBe(1)
        await store.dispatch.user.incrementAsync(3)
        userData = store.getState().user
        expect(userData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
