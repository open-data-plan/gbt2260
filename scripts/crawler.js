const puppeteer = require('puppeteer')
const fs = require('fs')
const { promisify } = require('util')
const signale = require('signale')
const options = require('../.gbt2260.json')

const crawl = async option => {
  const { url, selector, version } = option
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    try {
      await page.goto(url)
    } catch (error) {
      throw error
    }
    const data = await page.evaluate(selector => {
      let temp = {}
      const tds = document.querySelectorAll(selector)
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
    }, selector)

    signale.complete(`Crawl ${version} complete successfully`)
    signale.start('Save File')
    await promisify(fs.writeFile)(
      `data/${version}.json`,
      JSON.stringify(data, null, 2),
      {
        encode: 'utf8'
      }
    )
    signale.success('Success')
    await browser.close()
  } catch (err) {
    console.log(err)
    signale.error('Error...')
  }
}

const start = async () => {
  signale.start('Start crawl data')
  await Promise.all(options.map(option => crawl(option)))
  signale.success('All done')
  process.exit(0)
}

start()
