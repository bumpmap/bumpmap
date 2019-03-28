import { init } from '@rematch/core'
import { pins, initialState } from '@/models/pins'
import { withDefaultReducers } from 'rematch-default-reducers'
import {
  MAX_DISTANCES,
  withDistances,
  filterPinsByDistance,
  withFocus,
} from '../pins'
import { fakePins } from '../../components/home/fake-pins'

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
      maxDistances = [...MAX_DISTANCES]
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

    describe('withFocus', () => {
      it('exists', () => {
        expect(withFocus)
          .toBeDefined()
          .toBeFunction()
      })
      it('returns the collection with a given id focus set to true, rest false', () => {
        const result = withFocus(collection, 'PIN30')
        expect(result)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
        expect(result.length).toEqual(collection.length)
        result.forEach(pin => {
          expect(pin).toBeDefined()
          expect(pin.focused)
            .toBeDefined()
            .toBeBoolean()
          const expected = pin.id === 'PIN30'
          expect(pin.focused).toEqual(expected)
        })

        const again = withFocus(result, 'PIN15')

        expect(again)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
        expect(again.length).toEqual(collection.length)
        again.forEach(pin => {
          expect(pin).toBeDefined()
          expect(pin.focused)
            .toBeDefined()
            .toBeBoolean()
          const expected = pin.id === 'PIN15'
          expect(pin.focused).toEqual(expected)
        })
      })
    })
  })

  describe('reducers', () => {
    describe('focusOn', () => {
      it('should focus on a given id', () => {
        const store = init({
          models: withDefaultReducers({ pins }),
        })

        const fakes = [...fakePins]

        const initialState = store.getState().pins
        let { focusedOn, filtered, all } = initialState
        expect(focusedOn)
          .toBeDefined()
          .toBeString()
          .toBeEmpty()
        expect(filtered)
          .toBeDefined()
          .toBeArray()
          .toBeEmpty()

        store.dispatch.pins.updateContext({ pins: fakes, zoom: 0 })

        const withFakePins = store.getState().pins
        focusedOn = withFakePins.focusedOn
        all = withFakePins.all
        filtered = withFakePins.filtered
        expect(focusedOn)
          .toBeDefined()
          .toBeString()
          .toBeEmpty()
        expect(all)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
        expect(filtered)
          .toBeDefined()
          .toBeArray()
          .not.toBeEmpty()
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
