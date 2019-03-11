describe('index.js', () => {
  test('Should be a instance of gb2260.GB2260', () => {
    const gbt2260 = require('../src')
    const gb2260 = require('gb2260')

    expect(gbt2260).toBeInstanceOf(gb2260.GB2260)
  })

  test('Should be correct revision', () => {
    const gbt2260 = require('../src')

    expect(gbt2260.revision).toBe('201901')
  })

  test('Should be correct data', () => {
    const gbt2260 = require('../src')

    expect(gbt2260.provinces().length).toBe(34)
  })
})
