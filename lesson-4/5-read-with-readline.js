import readline from "readline"
import fs from "fs"
import path from "path"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Please enter the path to file: ", (fileName) => {
  fs.readFile(path.join(process.cwd(), fileName), 'utf-8', (err, data) => {
    console.log(data)
    rl.close();
  })
})

rl.on("close", () => process.exit(0));