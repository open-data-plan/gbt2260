declare module '*.json' {
  const content: any
  export default any
}

declare class Division {
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

declare interface Data {
  [code: string]: string
}

declare class GBT2260 {
  revision: string
  data: Data
  codes: string[]
  constructor(revision: string, data: Data)
  get: (code?: string) => Division
  provinces: () => Division[]
  prefectures: (code?: string) => Division[]
  counties: (code?: string) => Division[]
}

declare const gbt2260: GBT2260
export default gbt2260
