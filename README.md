# gbt2260.js

[![node](https://img.shields.io/node/v/@opd/gbt2260.svg)](https://www.npmjs.com/package/gbt2260.js)
[![npm](https://img.shields.io/npm/v/@opd/gbt2260.svg)](https://www.npmjs.com/package/gbt2260.js)
[![license](https://img.shields.io/npm/l/gbt2260.js.svg)](https://github.com/open-data-plan/gbt2260.js/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/open-data-plan/gbt2260.svg?branch=master)](https://travis-ci.org/open-data-plan/gbt2260)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![Coverage Status](https://coveralls.io/repos/github/open-data-plan/gbt2260/badge.svg?branch=master)](https://coveralls.io/github/open-data-plan/gbt2260?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/open-data-plan/gbt2260/badge.svg?targetFile=package.json)](https://snyk.io/test/github/open-data-plan/gbt2260?targetFile=package.json)

latest([201908](http://www.mca.gov.cn/article/sj/xzqh/2019/201908/201908271607.html)) Chinese administrative divisions from [`MCA`](http://www.mca.gov.cn/article/sj/xzqh/2019/), and based on [`gb2260`](https://github.com/cn/GB2260.js)

## Install

```bash
npm i @opd/gbt2260
```

## Use

```js
const gbt2260 = require('@opd/gbt2260')
```

## Crawl Data

```bash
npm run generate
```

### Difference with [`gb2260`](https://github.com/cn/GB2260.js)

1. `gb2260` looks like a dead project, no one in maintain
2. rewrite `prefectures()`
