import inquirer from "inquirer"
import fsp from "fs/promises"
import path from "path"

fsp
  .readdir(path.join(process.cwd()))
  .then(async (indir) => {
    const list = [];
    for (const item of indir) {
      const src = await fsp.stat(item);
      if (src.isFile()) list.push(item);
    }
    return list;
  })
  .then((choices) => {
    return inquirer.prompt({
      name: "fileName",
      type: "list",
      message: "Choose file",
      choices,
    })
      .then(({ fileName }) => fsp.readFile(fileName, "utf-8"))
      .then(console.log)
  })

// Запуск node 6-inquirer.js