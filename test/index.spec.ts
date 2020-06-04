import gbt2260 from '../src'
import Division from '../src/division'
import { revision } from '../src/version'

describe('index.js', () => {
  test('Should be correct revision', () => {
    expect(gbt2260.revision).toBe(revision)
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

    const prefectures2 = gbt2260.prefectures(500000, false)
    expect(prefectures2.length).toBe(0)
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

  test('invalid code', () => {
    expect(() => gbt2260.get(1)).toThrow('Invalid code')
    expect(gbt2260.get).toThrow('Invalid code')
    expect(() => gbt2260.get(121111)).toThrow('Invalid code')
    expect(() => gbt2260.prefectures('000000')).toThrow('Invalid province code')
    expect(() => gbt2260.prefectures()).toThrow('Invalid province code')
    expect(() => gbt2260.counties('900100')).toThrow('Invalid prefecture code')
    expect(() => gbt2260.counties()).toThrow('Invalid prefecture code')
  })

  test('prefecture code', () => {
    const division = gbt2260.get(130100)
    expect(division).toHaveProperty('name', '石家庄市')
    expect(division).toHaveProperty('code', '130100')
    expect(division.toString()).toEqual('河北省 石家庄市')
  })

  test('county code', () => {
    const division = gbt2260.get(130102)
    expect(division).toHaveProperty('name', '长安区')
    expect(division).toHaveProperty('code', '130102')
    expect(division.toString()).toEqual('河北省 石家庄市 长安区')
    const division1 = gbt2260.get(110101)
    expect(division1.toString()).toEqual('北京市 东城区')
  })
})
