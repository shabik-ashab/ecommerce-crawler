import puppeteer from "puppeteer";
import scrapeProductDetails from "./pdDetails.mjs";
import getProductLinks from "./pdLink.mjs";
import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis({
  maxRetriesPerRequest: null
});

new Worker('product', async (job) => {
    const link = job.data.url
    const pdDetails = await scrapeProductDetails(link)
    console.log(pdDetails)
},{connection})

// we can add link to queue from addLink.mjs file


