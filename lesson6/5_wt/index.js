import { Worker } from 'worker_threads'

const passwordSizeBytes = 40

function start(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData })
        worker.on('message', resolve);
        worker.on('error', reject)
    })
}

start(passwordSizeBytes)
    .then((result) => console.log(result))
    .catch((err) => console.error(err))
