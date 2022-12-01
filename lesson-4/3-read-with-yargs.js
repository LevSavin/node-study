import yargs from "yargs"
import { hideBin } from 'yargs/helpers'
import fs from "fs"
import path from "path"

const options = yargs(hideBin(process.argv))
  .usage('Usage: -p <path>')
  .option('p', {alias: 'path', describe: 'Path to file', demandOption: true})
  .argv;

  const fileName = options.path;
  
  fs.readFile(path.join(process.cwd(), fileName), 'utf-8', (err, data) => {
    console.log(data)
  })
// Вызов
// node 3-read-with-yargs.js -p access.log
// npm run readFile -- -p access.log