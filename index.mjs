import puppeteer from "puppeteer";
import scrapeProductDetails from "./pdDetails.mjs";

const url =
  "https://www.ryanscomputers.com/dynabook-toshiba-satellite-pro-c40-g-13f-intel-cdc-5205u-14-inch-hd-display-dark-blue-laptop";

(async () => {
  const productDetails = await scrapeProductDetails(url);
  console.log("Product Details:", productDetails);
})();
