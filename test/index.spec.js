const gbt2260 = require('../src')
const Division = require('../src/division')

describe('index.js', () => {
  test('Should be correct revision', () => {
    expect(gbt2260.revision).toBe('201901')
  })

  test('Should be correct data', () => {
    expect(gbt2260.provinces().length).toBe(34)
    expect(gbt2260.get(110000)).toBeInstanceOf(Division)
  })

  test('Should return prefectures if prefectures exist', () => {
    const prefectures = gbt2260.prefectures(510000)
    expect(prefectures.length).toBe(21)
  })

  test('Should return counties if no prefectures', () => {
    const prefectures = gbt2260.prefectures(500000)
    expect(prefectures.length).toBe(38)

    const prefectures1 = gbt2260.prefectures(110000)
    expect(prefectures1.length).toBe(16)
  })

  test('Should return empty array if no prefectures and no counties', () => {
    const prefectures = gbt2260.prefectures(710000)
    expect(prefectures.length).toBe(0)

    const prefectures1 = gbt2260.prefectures(810000)
    expect(prefectures1.length).toBe(0)

    const prefectures2 = gbt2260.prefectures(820000)
    expect(prefectures2.length).toBe(0)
  })

  test('Should return counties', () => {
    const prefectures = gbt2260.prefectures(130000)
    const counties = gbt2260.counties(prefectures[0].code)
    expect(counties.length).toBeTruthy()
  })
})
