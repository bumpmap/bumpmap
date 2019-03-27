import { pluck, map } from 'rambda'
import { mean } from 'ramda'

import { fetchAllPins } from '@/components/home/fake-pins.js'
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

export const initialState = {
  zoom: 0,
  center: [-2, 53],
  all: [],
  filtered: [],
  newPin: {
    exists: false,
    saved: false,
    data: {
      id: '',
      topic: '',
      body: '',
      createdAt: Date.now(),
      author: '',
      score: 0,
      coordinates: [-2, 53],
      image: '',
      color: 'white',
    },
  },
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
    updateContext(state, { pins, zoom, center }) {
      const resultZoom = zoom || state.zoom
      const resultCenter = center || state.center
      const all = pins || state.all
      const collection = withDistances(all, resultCenter)
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
      return {
        ...state,
        all,
        meanScore,
        zoom: resultZoom,
        center: resultCenter,
        filtered: withSize,
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
  }),
}

export default {
  pins,
  filterPinsByDistance,
  MAX_DISTANCES,
}
