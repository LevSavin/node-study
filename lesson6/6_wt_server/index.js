import { Worker } from 'worker_threads'
import os from 'os'

const numCPUs = os.cpus().length

let i = 0
while (i < numCPUs) {
    const workerData = { portOfset: i }
    const worker = new Worker('./worker.js', { workerData })
    worker.on("message", console.log)
    i++
}