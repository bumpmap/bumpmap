import fakePins from '@/components/home/fake-pins.js'
import { pluck, reduce, min, max } from 'rambda'
import { mean } from 'ramda'

describe('fakePins', () => {
  test('have scores between 1 and 1000', () => {
    expect(fakePins)
      .toBeDefined()
      .toBeArray()
      .not.toBeEmpty()
    const scores = pluck('score')(fakePins)
    const meanScore = mean(scores)
    const minScore = reduce(min, scores[0], scores)
    const maxScore = reduce(max, scores[0], scores)

    expect(meanScore > 1).toBeTruthy()
    expect(meanScore < 1000).toBeTruthy()
    expect(minScore >= 1).toBeTruthy()
    expect(maxScore > 100).toBeTruthy()
    expect(maxScore <= 1000).toBeTruthy()
  })
})
