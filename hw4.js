import inquirer from "inquirer"
import fs from "fs"
import fsp from "fs/promises"
import path from "path"
import { Transform } from "stream"

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
  const textArray = text.toString().match(new RegExp(`${searchSring}.*`, 'g'));
  console.log(textArray)
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

// Запуск без параметра:
// node hw4.js

// Путь всегда первым параметром:
// node hw4.js lesson-4/someDir

// Строка для поиска всегда вторым параметром, после пути:
// node hw4.js lesson-4/someDir

// Передача строки для поиска без параметра пути
// node hw4.js '' 176.212.24.22


