import { init } from '@rematch/core'
import { preferences, initialState } from '@/models/preferences'

describe.skip('models/preferences', () => {
  it('exists', () => {
    expect(preferences).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(preferences.state).toEqual(initialState)
    const store = init({
      models: { preferences },
    })
    const result = store.getState()
    expect(result.preferences).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { preferences },
        })

        const initialValue = initialState.count
        store.dispatch.preferences.increment(3)
        const result1 = store.getState().preferences.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.preferences.increment(1000)
        const result2 = store.getState().preferences.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.preferences.increment(1000000)
        const result3 = store.getState().preferences.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { preferences },
        })

        await store.dispatch.preferences.incrementAsync(1)
        let preferencesData = store.getState().preferences
        expect(preferencesData.count).toBe(1)
        await store.dispatch.preferences.incrementAsync(3)
        preferencesData = store.getState().preferences
        expect(preferencesData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
