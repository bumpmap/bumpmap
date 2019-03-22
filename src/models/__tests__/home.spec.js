import { init } from '@rematch/core'
import { home, initialState } from '@/models/home'

describe('models/home', () => {
  it('exists', () => {
    expect(home).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(home.state).toEqual(initialState)
    const store = init({
      models: { home },
    })
    const result = store.getState()
    expect(result.home).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { home },
        })

        const initialValue = initialState.count
        store.dispatch.home.increment(3)
        const result1 = store.getState().home.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.home.increment(1000)
        const result2 = store.getState().home.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.home.increment(1000000)
        const result3 = store.getState().home.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { home },
        })

        await store.dispatch.home.incrementAsync(1)
        let homeData = store.getState().home
        expect(homeData.count).toBe(1)
        await store.dispatch.home.incrementAsync(3)
        homeData = store.getState().home
        expect(homeData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
