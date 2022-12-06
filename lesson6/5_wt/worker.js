import { workerData, parentPort } from 'worker_threads';
import crypto from 'crypto';

const passwort = crypto.randomBytes(workerData).toString('hex');
parentPort.postMessage({ result: `Password was generated: ${passwort}` })