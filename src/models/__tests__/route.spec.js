import { init } from '@rematch/core'
import { route, initialState } from '@/models/route'

describe('models/route', () => {
  it('exists', () => {
    expect(route).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(route.state).toEqual(initialState)
    const store = init({
      models: { route },
    })
    const result = store.getState()
    expect(result.route).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { route },
        })

        const initialValue = initialState.count
        store.dispatch.route.increment(3)
        const result1 = store.getState().route.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.route.increment(1000)
        const result2 = store.getState().route.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.route.increment(1000000)
        const result3 = store.getState().route.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { route },
        })

        await store.dispatch.route.incrementAsync(1)
        let routeData = store.getState().route
        expect(routeData.count).toBe(1)
        await store.dispatch.route.incrementAsync(3)
        routeData = store.getState().route
        expect(routeData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
