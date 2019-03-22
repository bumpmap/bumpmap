import { init } from '@rematch/core'
import { explorer, initialState } from '@/models/explorer'

describe('models/explorer', () => {
  it('exists', () => {
    expect(explorer).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(explorer.state).toEqual(initialState)
    const store = init({
      models: { explorer },
    })
    const result = store.getState()
    expect(result.explorer).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { explorer },
        })

        const initialValue = initialState.count
        store.dispatch.explorer.increment(3)
        const result1 = store.getState().explorer.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.explorer.increment(1000)
        const result2 = store.getState().explorer.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.explorer.increment(1000000)
        const result3 = store.getState().explorer.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { explorer },
        })

        await store.dispatch.explorer.incrementAsync(1)
        let explorerData = store.getState().explorer
        expect(explorerData.count).toBe(1)
        await store.dispatch.explorer.incrementAsync(3)
        explorerData = store.getState().explorer
        expect(explorerData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
