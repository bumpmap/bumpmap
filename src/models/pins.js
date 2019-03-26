import { fetchAllPins } from '@/components/home/fake-pins.js'

export const initialState = {
  zoom: 6,
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
    addPins(state, payload) {},
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchAll(payload, rootState) {
      const all = await fetchAllPins()
      dispatch.pins.setAll(all)
    },
  }),
}

export default {
  pins,
  filterPinsByDistance,
}
