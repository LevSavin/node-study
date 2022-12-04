import os from 'os'
import cp from 'child_process'

const numCPUs = os.cpus().length
console.log(`Master ${process.pid} is running...`);

let i = 0
while(i < numCPUs) {
    cp.fork('./worker.js', [i])
    i++
}