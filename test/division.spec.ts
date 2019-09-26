import Division from '../src/division'
import data from '../data/201901.json'

describe('division', () => {
  test('create instance', () => {
    const code = '110000'
    const name = data[code]
    const revision = '201901'

    const division = new Division(code, name, revision)

    expect(division).toBeInstanceOf(Division)
    expect(division.toJSON()).toHaveProperty('name', name)
    expect(division.toJSON()).toHaveProperty('code', code)
    expect(division.toString()).toBe('北京市')
    expect(division.valueOf()).toEqual('北京市')
    expect(division.inspect()).toEqual('<GB/T 2260-201901> 110000 北京市')

    const division1 = new Division(code, name, '')
    expect(division1.inspect()).toEqual('<GB/T 2260> 110000 北京市')
  })
})
