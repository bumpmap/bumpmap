import { init } from '@rematch/core'
import { messages, initialState } from '@/models/messages'

describe('models/messages', () => {
  it('exists', () => {
    expect(messages).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(messages.state).toEqual(initialState)
    const store = init({
      models: { messages },
    })
    const result = store.getState()
    expect(result.messages).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { messages },
        })

        const initialValue = initialState.count
        store.dispatch.messages.increment(3)
        const result1 = store.getState().messages.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.messages.increment(1000)
        const result2 = store.getState().messages.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.messages.increment(1000000)
        const result3 = store.getState().messages.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { messages },
        })

        await store.dispatch.messages.incrementAsync(1)
        let messagesData = store.getState().messages
        expect(messagesData.count).toBe(1)
        await store.dispatch.messages.incrementAsync(3)
        messagesData = store.getState().messages
        expect(messagesData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
