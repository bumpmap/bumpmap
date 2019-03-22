import * as models from '@/models'

describe('models', () => {
  it('exports login', () => {
    expect(models.login).toBeDefined()
  })
  it('exports signup', () => {
    expect(models.signup).toBeDefined()
  })
  it('exports maps', () => {
    expect(models.maps).toBeDefined()
  })
  it('exports messages', () => {
    expect(models.messages).toBeDefined()
  })
  it('exports notifications', () => {
    expect(models.notifications).toBeDefined()
  })
  it('exports search', () => {
    expect(models.search).toBeDefined()
  })
})
