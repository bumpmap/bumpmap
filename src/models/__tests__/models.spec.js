import {
  home,
  login,
  maps,
  messages,
  notifications,
  pins,
  post,
  preferences,
  route,
  search,
  signup,
  user,
} from '@/models'

describe('models', () => {
  it('exports home', () => {
    expect(home).toBeDefined()
  })
  it('exports login', () => {
    expect(login).toBeDefined()
  })
  it('exports maps', () => {
    expect(maps).toBeDefined()
  })
  it('exports messages', () => {
    expect(messages).toBeDefined()
  })
  it('exports notifications', () => {
    expect(notifications).toBeDefined()
  })
  it('exports pins', () => {
    expect(pins).toBeDefined()
  })
  it('exports post', () => {
    expect(post).toBeDefined()
  })
  it('exports preferences', () => {
    expect(preferences).toBeDefined()
  })
  it('exports route', () => {
    expect(route).toBeDefined()
  })
  it('exports search', () => {
    expect(search).toBeDefined()
  })
  it('exports signup', () => {
    expect(signup).toBeDefined()
  })
  it('exports user', () => {
    expect(user).toBeDefined()
  })
})
