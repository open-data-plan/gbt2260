import Division from './division'

export default class GBT2260 {
  constructor(revision, data) {
    this.revision = revision
    this.data = data
    this.codes = Object.keys(this.data).sort()
  }

  get = (code = '') => {
    code = code.toString()
    if (code.length !== 6) {
      throw new Error('Invalid code')
    }

    const name = this.data[code]
    if (!name) {
      return null
    }

    const revision = this.revision
    const division = new Division(code, name)

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

  provinces = () => {
    const rv = []
    let name
    this.codes.forEach(k => {
      if (/0{4}$/.test(k)) {
        name = this.data[k]
        rv.push(new Division(k, name, this.revision))
      }
    })
    return rv
  }

  prefectures = (code = '') => {
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
    const rv = []
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

  counties = (code = '') => {
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
    const rv = []
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
