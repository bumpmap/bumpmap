import { init } from '@rematch/core'
import { pins, initialState } from '@/models/pins'

describe.skip('models/pins', () => {
  it('exists', () => {
    expect(pins).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(pins.state).toEqual(initialState)
    const store = init({
      models: { pins },
    })
    const result = store.getState()
    expect(result.pins).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { pins },
        })

        const initialValue = initialState.count
        store.dispatch.pins.increment(3)
        const result1 = store.getState().pins.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.pins.increment(1000)
        const result2 = store.getState().pins.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.pins.increment(1000000)
        const result3 = store.getState().pins.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { pins },
        })

        await store.dispatch.pins.incrementAsync(1)
        let pinsData = store.getState().pins
        expect(pinsData.count).toBe(1)
        await store.dispatch.pins.incrementAsync(3)
        pinsData = store.getState().pins
        expect(pinsData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
