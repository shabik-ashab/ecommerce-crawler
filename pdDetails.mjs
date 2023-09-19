import puppeteer from "puppeteer";

const scrapeProductDetails = async (url) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.waitForSelector(".product_content");

  const title = await page.evaluate(() => {
    const titleEl = document.querySelector('h1[itemprop="name"]');
    const title = titleEl.innerText.trim();
    return title;
  });

  const price = await page.evaluate(() => {
    const priceEl = document.querySelector(".rp-block span");
    const priceText = priceEl.innerText.trim();
    const priceArr = priceText.split(" ");
    const extPrice = priceArr[priceArr.length - 1];
    return extPrice;
  });

  const description = await page.evaluate(() => {
    const descriptionItems = document.querySelectorAll('.short-desc-attr .category-info li');
    const descriptionObject = {};

    descriptionItems.forEach((item) => {
      const itemText = item.innerText.trim();
      const [key, value] = itemText.split(' - ');
      descriptionObject[key] = value;
    });

    return descriptionObject;
  });

  const pdDetails = {
    title: title,
    price: price,
    description: description
  };

  await browser.close();
  return pdDetails;
};

export default scrapeProductDetails;
