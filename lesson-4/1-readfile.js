import fs from "fs"
import path from "path"

const fileName = process.argv[2];

fs.readFile(path.join(process.cwd(), fileName), 'utf-8', (err, data) => {
  console.log(data)
})