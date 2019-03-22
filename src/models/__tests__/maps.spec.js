import { init } from '@rematch/core'
import { maps, initialState } from '@/models/maps'

describe('models/maps', () => {
  it('exists', () => {
    expect(maps).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(maps.state).toEqual(initialState)
    const store = init({
      models: { maps },
    })
    const result = store.getState()
    expect(result.maps).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { maps },
        })

        const initialValue = initialState.count
        store.dispatch.maps.increment(3)
        const result1 = store.getState().maps.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.maps.increment(1000)
        const result2 = store.getState().maps.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.maps.increment(1000000)
        const result3 = store.getState().maps.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { maps },
        })

        await store.dispatch.maps.incrementAsync(1)
        let mapsData = store.getState().maps
        expect(mapsData.count).toBe(1)
        await store.dispatch.maps.incrementAsync(3)
        mapsData = store.getState().maps
        expect(mapsData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
