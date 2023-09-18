import puppeteer from "puppeteer";

const url = 'https://www.ryanscomputers.com/category/laptop-all-laptop';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.waitForSelector('.grid-view-category')

  const productLinks = await page.evaluate(() => {
    const productLinksArray = [];
    const productElements = document.querySelectorAll('.category-single-product');

    productElements.forEach((productElement) => {
      const cardBody = productElement.querySelector('.card-body a')
      const productLink = cardBody.getAttribute('href');
      if (productLink) {
        productLinksArray.push(productLink);
      }
    });

    return productLinksArray;
  });

  console.log('Product Links:', productLinks);

  await browser.close();
})();