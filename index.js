import * as theme from 'jsonresume-theme-stackoverflow'
import { promises as fs } from 'fs'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const resumeFR = JSON.parse(await fs.readFile('fr/resume.json', 'utf-8'))
const resumeEN = JSON.parse(await fs.readFile('en/resume.json', 'utf-8'))
const htmlFR = await render(resumeFR, theme)
const htmlEN = await render(resumeFR, theme)

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setContent(htmlFR, { waitUntil: 'networkidle0' })
await page.pdf({ path: 'fr/resume.pdf', format: 'a4', printBackground: true })

await page.setContent(htmlEN, { waitUntil: 'networkidle0' })
await page.pdf({ path: 'en/resume.pdf', format: 'a4', printBackground: true })

await browser.close()
