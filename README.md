# GBT2260

[![gbt/2260](https://img.shields.io/static/v1?label=GB/T&message=2260&color=brightgreen)](http://www.gb688.cn/bzgk/gb/newGbInfo?hcno=C9C488FD717AFDCD52157F41C3302C6D)
[![node](https://img.shields.io/node/v/@opd/gbt2260.svg)](https://www.npmjs.com/package/@opd/gbt2260)
[![npm](https://img.shields.io/npm/v/@opd/gbt2260.svg)](https://www.npmjs.com/package/@opd/gbt2260)
[![license](https://img.shields.io/npm/l/@opd/gbt2260.svg)](https://github.com/open-data-plan/gbt2260/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/open-data-plan/gbt2260.svg?branch=master)](https://travis-ci.org/open-data-plan/gbt2260)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![Coverage Status](https://coveralls.io/repos/github/open-data-plan/gbt2260/badge.svg?branch=master)](https://coveralls.io/github/open-data-plan/gbt2260?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/open-data-plan/gbt2260/badge.svg?targetFile=package.json)](https://snyk.io/test/github/open-data-plan/gbt2260?targetFile=package.json)

> latest Chinese administrative divisions from [`MCA`](http://www.mca.gov.cn/article/sj/xzqh/2019/), and based on [`gb2260`](https://github.com/cn/GB2260.js)

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
