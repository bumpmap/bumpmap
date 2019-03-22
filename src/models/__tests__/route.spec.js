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
    describe('update', () => {
      it('updates with new params', () => {
        const store = init({
          models: { route },
        })

        const initialValue = initialState
        store.dispatch.route.update({ name: 'Join' })
        let result = store.getState().route.name
        expect(result).toEqual('Join')
        store.dispatch.route.update({ name: 'Foo' })
        result = store.getState().route.name
        expect(result).toEqual('Foo')
      })
    })
  })
})
