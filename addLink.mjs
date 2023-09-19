import { Queue } from 'bullmq';
import Redis from 'ioredis';
import getProductLinks from './pdLink.mjs';

const connection = new Redis({
  maxRetriesPerRequest: null
});

const myQueue = new Queue('product', {connection})

const categoryUrl = 'https://www.ryanscomputers.com/category/laptop-all-laptop';
const pdLinks = await getProductLinks(categoryUrl)
console.log(pdLinks)

for (const link of pdLinks) {
    myQueue.add(
        link,
        {url: link},
        {jobId: link}
    )
}