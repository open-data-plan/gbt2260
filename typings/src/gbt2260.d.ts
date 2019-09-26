import Division from './division';
interface Data {
    [code: string]: string;
}
export default class GBT2260 {
    revision: string;
    data: Data;
    codes: string[];
    constructor(revision: string, data: Data);
    get: (code?: string | number) => Division;
    provinces: () => Division[];
    prefectures: (code?: string | number) => Division[];
    counties: (code?: string | number) => Division[];
}
export {};
