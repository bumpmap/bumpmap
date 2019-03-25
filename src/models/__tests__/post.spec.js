import { init } from '@rematch/core'
import { post, initialState } from '@/models/post'

describe.skip('models/post', () => {
  it('exists', () => {
    expect(post).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(post.state).toEqual(initialState)
    const store = init({
      models: { post },
    })
    const result = store.getState()
    expect(result.post).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('increment', () => {
      it('reducer: my reducerName should do something', () => {
        const store = init({
          models: { post },
        })

        const initialValue = initialState.count
        store.dispatch.post.increment(3)
        const result1 = store.getState().post.count
        expect(result1).toBe(initialValue + 3)

        store.dispatch.post.increment(1000)
        const result2 = store.getState().post.count
        expect(result2).toBe(result1 + 1000)

        store.dispatch.post.increment(1000000)
        const result3 = store.getState().post.count
        expect(result3).toBe(result2 + 1000000)
      })
    })
  })

  describe('effects', () => {
    describe('incrementAsync', () => {
      it('increments count by payload', async () => {
        const store = init({
          models: { post },
        })

        await store.dispatch.post.incrementAsync(1)
        let postData = store.getState().post
        expect(postData.count).toBe(1)
        await store.dispatch.post.incrementAsync(3)
        postData = store.getState().post
        expect(postData.count).toBe(4)
      })
    })
  })

  it('should have real tests', () => {
    expect(false).toBeTruthy()
  })
})
