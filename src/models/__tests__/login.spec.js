import { init } from '@rematch/core'
import { login, initialState } from '@/models/login'

describe('models/login', () => {
  it('exists', () => {
    expect(login).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(login.state).toEqual(initialState)
    const store = init({
      models: { login },
    })
    const result = store.getState()
    expect(result.login).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { login },
        })

        const initialValue = initialState.count
        store.dispatch.login.increment(3)
        const result1 = store.getState().login.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.login.increment(1000)
        const result2 = store.getState().login.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.login.increment(1000000)
        const result3 = store.getState().login.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { login },
        })

        await store.dispatch.login.incrementAsync(1)
        let loginData = store.getState().login
        expect(loginData.count).toBe(1)
        await store.dispatch.login.incrementAsync(3)
        loginData = store.getState().login
        expect(loginData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
