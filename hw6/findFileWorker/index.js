import inquirer from "inquirer"
import fsp from "fs/promises"
import path from "path"
import { Worker } from 'worker_threads'

const inPath = process.argv.slice(2);

const onChoice = (choices, location) => {
  inquirer.prompt({
    name: "fileName",
    type: "list",
    message: "Choose file",
    choices,
  })
  .then(async ({ fileName }) => {
    const newLocation = `${location}${path.sep}${fileName}`;
    const src = await fsp.stat(newLocation);
    if (src.isFile()) {
      return readFile(newLocation) 
    }
    readAndChoice(newLocation);
  })
}

const findAndPrint = (text, searchSring) => {
  function start(workerData) {
      return new Promise((resolve, reject) => {
          const worker = new Worker('./worker.js', { workerData })
          worker.on('message', resolve);
          worker.on('error', reject)
      })
  }
  start({text, searchSring})
      .then((textArray) => console.log(textArray))
      .catch((err) => console.error(err))
}

const readFile = async (location) => {
  await fsp.readFile(location, "utf-8")
  .then((text) => {
    if (inPath.length === 2) {
      findAndPrint(text, inPath[1])
    } else {
      console.log(text);
    }
  })
}

const readAndChoice = (location) => {
  fsp
    .readdir(path.join( location ))
    .then((choices) => onChoice(choices, location))
}

if (inPath.length === 0) {
  readAndChoice(process.cwd());
} else {
  readAndChoice(`${process.cwd()}${path.sep}${inPath[0]}`);
}

//Пример запуска:
//node index.js '' return   - исначала нужно выбрать файл, где произойдёт поиск, либо указать его первым параметром. Результат - массив строк со словом "return"

// Запуск без параметра:
// node hw4.js

// Путь всегда первым параметром:
// node hw4.js lesson-4/someDir

// Строка для поиска всегда вторым параметром, после пути:
// node hw4.js lesson-4/someDir 176.212.24.22

// Передача строки для поиска без параметра пути
// node hw4.js '' 176.212.24.22


