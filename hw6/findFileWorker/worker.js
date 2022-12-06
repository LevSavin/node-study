import { workerData, parentPort } from 'worker_threads';
const textArray = workerData.text.toString().match(new RegExp(`${workerData.searchSring}.*`, 'g'));
parentPort.postMessage(textArray);