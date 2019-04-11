import { pluck, map, empty } from 'rambda'
import { mean } from 'ramda'

import { fetchPin, fetchAllPins } from '@/components/home/fake-pins.js'
export const MAX_DISTANCES = [
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

export const PROPORTION_PER_ZOOM = [25, 30]

export const defaultNewPin = {
  exists: false,
  saved: false,
  data: {
    id: '',
    topic: '',
    body: '',
    createdAt: Date.now(),
    author: '',
    score: 100,
    coordinates: [53, -2],
    image: '/img/dummy/59.gif',
    color: 'white',
  },
}

export const initialState = {
  zoom: 0,
  center: [53, -2],
  all: [],
  filtered: [],
  focused: false,
  focusedOn: '',
  addMode: false,
  newPin: { ...defaultNewPin },
}

export function withFocus(collection, id) {
  if (!id) {
    return collection.map(pin => ({ ...pin, focused: false }))
  }

  return collection.map(pin => ({ ...pin, focused: pin.id === id }))
}

/**
 * adds distances to a list of pins relative to center coordinates
 * @param {Pin[]} collection
 * @param {Number[]} center
 */
export function withDistances(collection, [x, y]) {
  if (!collection) {
    return []
  }

  return collection.map(pin => {
    const { coordinates } = pin
    const [pinX, pinY] = coordinates
    const dx = pinX - x
    const dy = pinY - y
    const distance = Math.hypot(dx, dy)

    return { ...pin, distance }
  })
}

/**
 *
 * @param {Pin[]} collection
 * @param {*} distance
 * @param {*} maxDistances
 */
export function filterPinsByDistance(collection, zoom, maxDistances) {
  return collection.filter(({ distance }) => distance <= maxDistances[zoom])
}

export const pins = {
  state: { ...initialState }, // initial state
  reducers: {
    toggleAddMode(state) {
      const { addMode } = state
      return { ...state, addMode: !addMode }
    },
    startAddMode(state, { center }) {
      const { newPin } = state
      return {
        ...state,
        addMode: true,
        newPin: {
          ...newPin,
          exists: true,
          saved: false,
          data: {
            ...defaultNewPin.data,
            coordinates: center,
          },
        },
      }
    },
    stopAddMode(state) {
      return {
        ...state,
        addMode: false,
        newPin: {
          ...defaultNewPin,
        },
      }
    },
    addToLibrary(state, { id, data }) {
      const library = {
        ...state.library,
      }
      library[id] = data
      return {
        ...state,
        library,
      }
    },
    updateContext(state, { pins, zoom, center, focus }) {
      const resultZoom = zoom || state.zoom
      const resultCenter = center || state.center
      const all = pins || state.all

      const focusedOn = focus ? focus : focus === false ? '' : state.focusedOn
      const collection = withFocus(withDistances(all, resultCenter), focusedOn)
      const filteredByDistance = filterPinsByDistance(
        collection,
        resultZoom,
        MAX_DISTANCES,
      )
      const scores = pluck('score')(filteredByDistance)
      const meanScore = mean(scores)

      const withSize = map(pin => ({
        ...pin,
        size: Math.floor(1000 + (pin.score - meanScore)),
      }))(filteredByDistance)

      const library = {}

      all.forEach(pin => {
        library[pin.id] = pin
      })

      const { newPin } = state

      return {
        ...state,
        all,
        library,
        meanScore,
        focusedOn,
        focused: !!focusedOn,
        zoom: resultZoom,
        center: resultCenter,
        filtered: withSize,
        newPin: {
          ...newPin,
          data: {
            ...newPin.data,
            coordinates: resultCenter,
          },
        },
      }
    },
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchAll(payload, rootState) {
      const all = await fetchAllPins()
      dispatch.pins.updateContext({
        pins: all,
        zoom: this.zoom,
        center: this.center,
      })
    },
    async fetchPin(id, rootState) {
      const data = await fetchPin(id)
      dispatch.pins.addToLibrary({ id, data })
    },
  }),
}

export default {
  pins,
  filterPinsByDistance,
  MAX_DISTANCES,
}
