import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()

  // Navigate the page to a URL
  await page.goto('https://www.ryanscomputers.com/category/laptop-all-laptop', {waitUntil: 'networkidle2'});
  await page.waitForSelector('.grid-view-category')

  const productLinks = await page.evaluate(() => {
    return [...document.querySelectorAll('.category-single-product')].map(e=>e.href)
  })
  console.log(productLinks)
  await page.close()
  await browser.close()
})();