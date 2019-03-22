import { init } from '@rematch/core'
import { layout, initialState } from '@/models/layout'

describe('models/layout', () => {
  it('exists', () => {
    expect(layout).toBeDefined()
  })

  it('has initial state', () => {
    expect(initialState).toBeDefined()
    expect(layout.state).toEqual(initialState)
    const store = init({
      models: { layout },
    })
    const result = store.getState()
    expect(result.layout).toEqual(initialState)
  })

  describe('reducers', () => {
    describe('toggleMenu', () => {
      it('should toggle left menu', () => {
        const store = init({
          models: { layout },
        })

        const initialValue = initialState.menus.left
        store.dispatch.layout.toggleMenu('left')
        let result = store.getState().layout.menus.left
        expect(result).toBe(!initialValue)

        store.dispatch.layout.toggleMenu('left')
        result = store.getState().layout.menus.left
        expect(result).toBe(initialValue)

        store.dispatch.layout.toggleMenu('left')
        result = store.getState().layout.menus.left
        expect(result).toBe(!initialValue)
      })

      it('should toggle right menu', () => {
        const store = init({
          models: { layout },
        })

        const initialValue = initialState.menus.right
        store.dispatch.layout.toggleMenu('right')
        let result = store.getState().layout.menus.right
        expect(result).toBe(!initialValue)

        store.dispatch.layout.toggleMenu('right')
        result = store.getState().layout.menus.right
        expect(result).toBe(initialValue)

        store.dispatch.layout.toggleMenu('right')
        result = store.getState().layout.menus.right
        expect(result).toBe(!initialValue)
      })

      it('should toggle both left and right menu together', () => {
        const store = init({
          models: { layout },
        })

        const initialValue = initialState.menus
        store.dispatch.layout.toggleMenu('right')
        store.dispatch.layout.toggleMenu('left')
        store.dispatch.layout.toggleMenu('right')
        store.dispatch.layout.toggleMenu('left')
        expect(store.getState().layout.menus).toEqual(initialValue)
        store.dispatch.layout.toggleMenu('right')
        expect(store.getState().layout.menus).toEqual({
          ...initialValue,
          right: !initialValue.right,
        })
      })

      it('should fail silently if payload is not left or right', () => {
        const store = init({
          models: { layout },
        })

        const initialValue = initialState.menu
        let result
        expect(() => {
          store.dispatch.layout.toggleMenu('x')
          result = store.getState().layout.menu
        }).not.toThrow()
        expect(result).toBe(initialValue)

        expect(() => {
          store.dispatch.layout.toggleMenu('y')
          result = store.getState().layout.menu
        }).not.toThrow()
        expect(result).toBe(initialValue)

        expect(() => {
          store.dispatch.layout.toggleMenu('z')
          result = store.getState().layout.menu
        }).not.toThrow()
        expect(result).toBe(initialValue)
      })
    })
  })
})
