import gb2260 from 'gb2260'

const revision = '201901'

gb2260.register(revision, require('../data/201901.json'))

export default new gb2260.GB2260(revision)
