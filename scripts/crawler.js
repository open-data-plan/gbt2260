const puppeteer = require('puppeteer')
const fs = require('fs')
const { promisify } = require('util')
const signale = require('signale')

const crawlPage = async option => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://www.mca.gov.cn/article/sj/xzqh/2019/')
    const crawledData = await page.evaluate(() => {
      const articles = document.querySelectorAll('.artitlelist')
      const codeArticles = Array.from(articles).filter(article =>
        article.innerText.includes('代码')
      )
      return codeArticles.map(anchor => anchor.href)
    })
    return crawledData
  } catch (error) {
    console.log(error)
    signale.error('Error...')
  }
}
const crawlData = async url => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    const crawledData = await page.evaluate(() => {
      let temp = {}
      let tds = document.querySelectorAll('td')
      let code = ''
      const title = tds[0].innerText
      const [, year, month] = title.match(/(\d+)\S(\d+)/)
      let version
      if (+month < 10) {
        version = year + '0' + month
      } else {
        version = [year, month].join()
      }
      tds = Array.from(tds).filter(td => td.innerText && td.innerText.trim())
      Array.from(tds).forEach(td => {
        const text = td.innerText.trim()
        if (/^\d+$/.test(text)) {
          code = text
        } else if (!temp[code] && code) {
          temp[code] = text
          code = ''
        }
      })
      return {
        data: temp,
        version
      }
    })
    const { version, data } = crawledData
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
  const pages = await crawlPage()
  await Promise.all(pages.map(page => crawlData(page)))
  signale.success('All done')
  process.exit(0)
}

start()
