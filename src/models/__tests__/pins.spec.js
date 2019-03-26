import { init } from '@rematch/core'
import { pins, initialState } from '@/models/pins'
import { withDefaultReducers } from 'rematch-default-reducers'
import { withDistances, filterPinsByDistance } from '../pins'
import { fakePins } from '@/components/home/fake-pins.js'

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

  describe('pin collection functions', () => {
    let collection, center, zoom, maxDistances

    beforeEach(() => {
      maxDistances = [
        320,
        320,
        320,
        160,
        92,
        46,
        23,
        12,
        7,
        4,
        2,
        1,
        0.5,
        0.25,
        0.1,
        0.05,
        0.05,
        0.02,
        0.02,
        0.02,
      ]
      collection = [...fakePins]
      zoom = 6
      center = [-2, 53]
    })

    describe('filterPinsByDistance', () => {
      it('exists', () => {
        expect(filterPinsByDistance)
          .toBeDefined()
          .toBeFunction()
      })

      it('returns the collection filtered by distance based off maxDistances and the current zoom level', () => {
        collection = withDistances(collection, center)
        expect(collection)
          .toBeArray()
          .not.toBeEmpty()
        let result = filterPinsByDistance(collection, 4, maxDistances)
        expect(result)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
        expect(result.length < collection.length).toBeTruthy()
        let lastResult = result
        result = filterPinsByDistance(collection, 5, maxDistances)

        expect(result)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
        expect(result.length < lastResult.length).toBeTruthy()
        lastResult = result
        result = filterPinsByDistance(collection, 8, maxDistances)
      })
    })
    describe('withDistances', () => {
      it('exists', () => {
        expect(withDistances)
          .toBeDefined()
          .toBeFunction()
      })

      it('returns the collection filtered by distance based off maxDistances', () => {
        const result = withDistances(collection, center)
        expect(result)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
        expect(result.length).toEqual(collection.length)
        result.forEach(pin => {
          expect(pin).toBeDefined()
          expect(pin.distance)
            .toBeDefined()
            .toBeNumber()
          expect(pin.distance > 0).toBeTruthy()
          expect(pin.distance < 1000).toBeTruthy()
        })
      })
    })
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
