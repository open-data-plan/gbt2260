export default class Division {
  code: string
  name: string
  revision: string
  province?: Division
  prefecture?: Division
  constructor(code: string, name: string, revision: string)
  toString: () => string
  valueOf: () => string
  toJSON: () => {
    name: string
    code: string
  }

  inspect: () => string
}
