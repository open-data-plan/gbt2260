import Division from './division'

interface Data {
  [code: string]: string
}

export default class GBT2260 {
  public revision: string
  public data: Data
  public codes: string[]
  constructor(revision: string, data: Data) {
    this.revision = revision
    this.data = data
    this.codes = Object.keys(this.data).sort()
  }

  public get = (code: string | number = ''): Division => {
    code = code.toString()
    if (code.length !== 6) {
      throw new Error('Invalid code')
    }

    const name = this.data[code]
    if (!name) {
      throw new Error('Invalid code')
    }

    const revision = this.revision
    const division = new Division(code, name, revision)

    if (/0{4}$/.test(code)) {
      return division
    }

    const provinceCode = code.substr(0, 2) + '0000'
    const provinceName = this.data[provinceCode]
    division.province = new Division(provinceCode, provinceName, revision)

    if (/0{2}$/.test(code)) {
      return division
    }

    const prefectureCode = code.substr(0, 4) + '00'
    const prefectureName = this.data[prefectureCode]
    if (prefectureName) {
      division.prefecture = new Division(
        prefectureCode,
        prefectureName,
        revision
      )
    }
    return division
  }

  public provinces = (): Division[] => {
    const rv: Division[] = []
    let name
    this.codes.forEach(k => {
      if (/0{4}$/.test(k)) {
        name = this.data[k]
        rv.push(new Division(k, name, this.revision))
      }
    })
    return rv
  }

  public prefectures = (code: string | number = ''): Division[] => {
    code = code.toString()
    if (!/0{4}$/.test(code)) {
      throw new Error('Invalid province code')
    }

    let name = this.data[code]
    if (!name) {
      throw new Error('Invalid province code')
    }

    const province = new Division(code, name, this.revision)
    const pattern = new RegExp('^' + code.substr(0, 2) + '\\d{2}00$')
    const rv: Division[] = []
    let division

    this.codes.forEach(k => {
      if (pattern.test(k) && k !== code) {
        name = this.data[k]
        division = new Division(k, name, this.revision)
        division.province = province
        rv.push(division)
      }
    })

    if (!rv.length) {
      const countyPattern = new RegExp('^' + code.substr(0, 2) + '\\d{4}$')

      this.codes.forEach(k => {
        if (countyPattern.test(k) && k !== code) {
          name = this.data[k]
          division = new Division(k, name, this.revision)
          division.province = province
          rv.push(division)
        }
      })
    }

    return rv
  }

  public counties = (code: string | number = ''): Division[] => {
    code = code.toString()
    if (!/[1-9]0{2,3}$/.test(code)) {
      throw new Error('Invalid prefecture code')
    }

    let name = this.data[code]
    if (!name) {
      throw new Error('Invalid prefecture code')
    }
    const prefecture = new Division(code, name, this.revision)

    const provinceCode = code.substr(0, 2) + '0000'
    name = this.data[provinceCode]
    const province = new Division(provinceCode, name, this.revision)

    const pattern = new RegExp('^' + code.substr(0, 4))
    const rv: Division[] = []
    let division

    this.codes.forEach(k => {
      if (pattern.test(k) && k !== code) {
        name = this.data[k]
        division = new Division(k, name, this.revision)
        division.province = province
        division.prefecture = prefecture
        rv.push(division)
      }
    })

    return rv
  }
}
