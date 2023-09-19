import scrapeProductDetails from "./pdDetails.mjs";
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import saveToDB from "./lowDb.mjs";

const connection = new Redis({
  maxRetriesPerRequest: null
});

new Worker('product', async (job) => {
    const link = job.data.url
    const pdDetails = await scrapeProductDetails(link)
    console.log(pdDetails)

    await saveToDB(link, {pdDetails})
},{connection})

// we can add link to queue from addLinkToQ.mjs file


