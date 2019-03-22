import { init } from '@rematch/core'
import { signup, initialState } from '@/models/signup'

describe('models/signup', () => {
  it('exists', () => {
    expect(signup).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(signup.state).toEqual(initialState)
    const store = init({
      models: { signup },
    })
    const result = store.getState()
    expect(result.signup).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { signup },
        })

        const initialValue = initialState.count
        store.dispatch.signup.increment(3)
        const result1 = store.getState().signup.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.signup.increment(1000)
        const result2 = store.getState().signup.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.signup.increment(1000000)
        const result3 = store.getState().signup.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { signup },
        })

        await store.dispatch.signup.incrementAsync(1)
        let signupData = store.getState().signup
        expect(signupData.count).toBe(1)
        await store.dispatch.signup.incrementAsync(3)
        signupData = store.getState().signup
        expect(signupData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
