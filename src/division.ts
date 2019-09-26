export default class Division {
  public code: string
  public name: string
  public revision: string
  public province?: Division
  public prefecture?: Division

  constructor(code: string, name: string, revision: string) {
    this.code = code
    this.name = name
    this.revision = revision
  }

  public toString = () => {
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

  public valueOf = () => this.toString()

  public toJSON = () => ({
    name: this.name,
    code: this.code,
  })

  public inspect = () => {
    let prefix = 'GB/T 2260'
    if (this.revision) {
      prefix += '-' + this.revision
    }
    return '<' + prefix + '> ' + this.code + ' ' + this.toString()
  }
}
