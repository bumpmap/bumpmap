import { init } from '@rematch/core'
import { search, initialState } from '@/models/search'

describe('models/search', () => {
  it('exists', () => {
    expect(search).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(search.state).toEqual(initialState)
    const store = init({
      models: { search },
    })
    const result = store.getState()
    expect(result.search).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { search },
        })

        const initialValue = initialState.count
        store.dispatch.search.increment(3)
        const result1 = store.getState().search.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.search.increment(1000)
        const result2 = store.getState().search.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.search.increment(1000000)
        const result3 = store.getState().search.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { search },
        })

        await store.dispatch.search.incrementAsync(1)
        let searchData = store.getState().search
        expect(searchData.count).toBe(1)
        await store.dispatch.search.incrementAsync(3)
        searchData = store.getState().search
        expect(searchData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
