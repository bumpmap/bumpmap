import { init } from '@rematch/core'
import { pins, initialState } from '@/models/pins'
import { withDefaultReducers } from 'rematch-default-reducers'

describe('models/pins', () => {
  it('exists', () => {
    expect(pins).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(pins.state).toEqual(initialState)
    const store = init({
      models: withDefaultReducers({ pins }),
    })
    const result = store.getState()
    expect(result.pins).toEqual(initialState)
  })

  describe('reducers', () => {
    describe.skip('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: withDefaultReducers({ pins }),
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
    describe('fetchAll', () => {
      it('fetches all pins and sets pins.all to result', async () => {
        const store = init({
          models: withDefaultReducers({ pins }),
        })
        expect(store.getState().pins.all).toBeDefined()
        expect(store.getState().pins.all.length)
          .toBeDefined()
          .toEqual(0)
        await store.dispatch.pins.fetchAll()
        let pinsData = store.getState().pins
        expect(pinsData.all.length).not.toBe(0)
      })
    })
  })
})
