import Router from 'vue-router'
import { store } from '@/state'
import router, { redirectUsersAwayFromAuthForms } from '@/router'

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
      store.getState.mockReturnValue(initialState)
      redirectUsersAwayFromAuthForms(
        { name: 'Login' },
        { name: 'Explorer' },
        next,
      )
      expect(next).toHaveBeenCalled()
    })

    it('redirects logged in users to Explorer if they attempt to go to Join', () => {
      store.getState.mockReturnValue({ user: { exists: true } })
      redirectUsersAwayFromAuthForms(
        { name: 'Join' },
        { name: 'Explorer' },
        next,
      )
      expect(next).toHaveBeenCalledWith({ name: 'Explorer' })
    })

    it('redirects logged in users to Explorer if they attempt to go to Login', () => {
      store.getState.mockReturnValue({ user: { exists: true } })
      redirectUsersAwayFromAuthForms(
        { name: 'Login' },
        { name: 'Explorer' },
        next,
      )
      expect(next).toHaveBeenCalledWith({ name: 'Explorer' })
    })

    it('does nothing if the user destination routes are not Join or Login', () => {
      router.push = jest.fn()
      const next = jest.fn()
      redirectUsersAwayFromAuthForms({ name: 'Foo' }, { name: 'Bar' }, next)
      expect(next).toHaveBeenCalled()
    })
  })
})
