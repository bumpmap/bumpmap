import Router from 'vue-router'
import { store } from '@/state'
import { redirectUsersAwayFromAuthForms } from '@/router'

// mocks
jest.mock('vue-router')
jest.mock('@/state', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
  },
}))

describe('router', () => {
  describe('redirectUsersAwayFromAuthForms', () => {
    let next, initialState

    beforeEach(() => {
      next = jest.fn()
      initialState = {
        user: {
          exists: false,
        },
      }
    })

    it('exists', () => {
      expect(redirectUsersAwayFromAuthForms)
        .toBeDefined()
        .toBeFunction()
    })

    it('does nothing if the user is not logged in', () => {
      const store = mockStore(initialState)

      expect(false).toBeTruthy()
    })

    it('redirects logged in users to Explorer if they attempt to go to Join', () => {
      expect(false).toBeTruthy()
    })

    it('does nothing if the user destination routes are not Join or Login', () => {
      router.push = jest.fn()
      const next = jest.fn()
      redirectUsersAwayFromAuthForms({ name: 'Foo' }, { name: 'Bar' }, next)
      expect(next).toHaveBeenCalledWith([])
      
    })
  })
})
