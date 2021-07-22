const fs = require('fs')
const { promisify } = require('util')
const signale = require('signale')
const Crawler = require('@opd/crawler').default
const chalk = require('chalk')
const format = require('string-template')
const { version: pkgVersion } = require('../package.json')

const currentVersion = pkgVersion.split('-').pop()

const crawlPage = async (option) => {
  try {
    const urlCrawler = new Crawler({
      pageEvaluate: () => {
        const articles = document.querySelectorAll('.artitlelist')
        const codeArticles = Array.from(articles).filter((article) =>
          article.innerText.includes('行政区划代码')
        )
        return codeArticles
          .filter((anchor) => {
            const title = anchor.innerHTML
            const year = title.split('年').shift()
            return +year >= 2011
          })
          .map((anchor) => anchor.href)
      },
    })

    await urlCrawler.launch()
    const [crawledData] = await urlCrawler.start(
      'http://www.mca.gov.cn/article/sj/xzqh/'
    )

    await urlCrawler.close()

    const urls = crawledData.result

    const dataUrlCrawler = new Crawler({
      pageEvaluate: () => {
        const articles = document.querySelectorAll('.content a')
        const codeArticles = Array.from(articles).filter((article) =>
          article.innerText.includes('县以上')
        )
        return codeArticles.map((anchor) => anchor.href)
      },
    })

    const dataUrlsCrawledData = await dataUrlCrawler.start(urls)

    await dataUrlCrawler.close()

    const dataUrls = dataUrlsCrawledData.map(({ result }) => result[0])

    const dataCrawler = new Crawler({
      pageEvaluate: () => {
        const temp = {}
        let tds = document.querySelectorAll('td')
        let code = ''
        const title = tds[0].innerText
        const [, year, month] = title.match(/(\d+)\S(\d+)/)
        let version
        if (+month < 10) {
          version = year + '0' + month
        } else {
          version = [year, month].join('')
        }
        tds = Array.from(tds).filter(
          (td) => td.innerText && td.innerText.trim()
        )
        Array.from(tds).forEach((td) => {
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
          version,
        }
      },
    })

    const divisionData = await dataCrawler.start(dataUrls)
    await dataCrawler.close()
    const versions = []

    await Promise.all(
      divisionData
        .filter(
          ({ result }) =>
            !isNaN(currentVersion) && +currentVersion < +result.version
        )
        .map(async ({ url, result }) => {
          const { version, data } = result
          versions.push(+version)
          signale.complete(`Crawl ${version} complete successfully`)
          signale.start('Save File')
          await promisify(fs.writeFile)(
            `src/data/${version}.json`,
            JSON.stringify(data, null, 2),
            {
              encoding: 'utf8',
            }
          )
        })
    )
    if (versions.length) {
      if (process.env.CI) {
        process.exit(1)
      }
      const latestVersion = Math.max(...versions)
      signale.await('Create index file...')
      const content = await promisify(fs.readFile)('scripts/version.tpl', {
        encoding: 'utf8',
      })
      await promisify(fs.writeFile)(
        'src/version.ts',
        format(content, {
          version: latestVersion,
        }),
        {
          encoding: 'utf8',
        }
      )
    } else {
      signale.complete('No versions found')
    }
  } catch (error) {
    console.log(error)
    signale.error('Error...')
  }
}

const start = async () => {
  signale.start('Start crawl data')
  const start = Date.now()
  await crawlPage()
  const time = Date.now() - start
  signale.success(`All done in ${chalk.yellow(`${time}ms`)}`)
  process.exit(0)
}

start()
