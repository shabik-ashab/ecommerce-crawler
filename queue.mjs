import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis({
  maxRetriesPerRequest: null
});

new Worker('product', async (job) => {
    console.log(job.data)
},{connection})

const myQueue = new Queue('product', {connection})
myQueue.add("pd",{url: "example.com"})