import { init } from '@rematch/core'
import { notifications, initialState } from '@/models/notifications'

describe('models/notifications', () => {
  it('exists', () => {
    expect(notifications).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(notifications.state).toEqual(initialState)
    const store = init({
      models: { notifications },
    })
    const result = store.getState()
    expect(result.notifications).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { notifications },
        })

        const initialValue = initialState.count
        store.dispatch.notifications.increment(3)
        const result1 = store.getState().notifications.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.notifications.increment(1000)
        const result2 = store.getState().notifications.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.notifications.increment(1000000)
        const result3 = store.getState().notifications.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { notifications },
        })

        await store.dispatch.notifications.incrementAsync(1)
        let notificationsData = store.getState().notifications
        expect(notificationsData.count).toBe(1)
        await store.dispatch.notifications.incrementAsync(3)
        notificationsData = store.getState().notifications
        expect(notificationsData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
