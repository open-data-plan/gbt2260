export default class Division {
  constructor(code, name, revision) {
    this.code = code
    this.name = name
    this.revision = revision
  }

  toString = () => {
    const rv = []
    if (this.province) {
      rv.push(this.province.name)
    }
    if (this.prefecture) {
      rv.push(this.prefecture.name)
    }
    rv.push(this.name)
    return rv.join(' ')
  }

  valueOf = () => this.toString()

  toJSON = () => ({
    name: this.name,
    code: this.code
  })

  inspect = () => {
    let prefix = 'GB/T 2260'
    if (this.revision) {
      prefix += '-' + this.revision
    }
    return '<' + prefix + '> ' + this.code + ' ' + this.toString()
  }
}
