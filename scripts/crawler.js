const puppeteer = require('puppeteer')
const fs = require('fs')
const { promisify } = require('util')
const signale = require('signale')

const start = async () => {
  signale.start('Start crawl data')
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    try {
      await page.goto(
        'http://www.mca.gov.cn/article/sj/xzqh/2019/201901-06/201902061009.html'
      )
    } catch (error) {
      throw error
    }
    const data = await page.evaluate(() => {
      let temp = {}
      const tds = document.querySelectorAll('.xl7016597')
      let code = ''
      Array.from(tds).forEach(td => {
        const text = td.innerText.trim()
        if (/\d+/.test(text)) {
          code = text
        } else if (!temp[code]) {
          temp[code] = text
        }
      })
      return temp
    })

    signale.complete('Crawl complete successfully')
    signale.start('Save File')
    await promisify(fs.writeFile)(
      'data/201901.json',
      JSON.stringify(data, null, 2),
      {
        encode: 'utf8'
      }
    )
    signale.success('Success')
  } catch (err) {
    signale.error('Error...')
  }
  await browser.close()
}

start()
