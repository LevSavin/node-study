import fs from "fs"
import os from "node:os" // отсюда берём символ переноса строки
import { Transform } from "stream"

const log1 = '127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1"200 0 "-" "curl/7.47.0"';
const log2 = '127.0.0.1 - - [30/Jan/2021:11:11:25 -0300] "GET /boo HTTP/1.1" 4040 "-" "curl/7.47.0"';

/* 
// поток на чтение
const readStream = fs.createReadStream('./access.log', 'utf8',);
readStream.on('data', (chunk) => {
  console.log('Chunk');
  console.log(chunk);
});
readStream.on('end', () => console.log('File reading finished'));
readStream.on('error', () => console.log(err));


// поток на запись
const writeStream = fs.createWriteStream('./access.log', { flags: 'a', encoding: 'utf8' });
writeStream.write(log1 + os.EOL);
writeStream.end(() => console.log('File writing finished'));
 */


// поток трансформ

const findAndWrite = (searchSring) => {
  const writeStream = fs.createWriteStream(`./logs/${searchSring}_requests.log`, { flags: 'a', encoding: 'utf8' });
  const readStream = new fs.ReadStream('./access_tmp.log', 'utf8');
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const ipArray = chunk.toString().match(new RegExp(`${searchSring}.*`, 'g'))
      if (ipArray) {
        callback(null, ipArray.join("\n"));
      }
    }
  });
  readStream.pipe(transformStream).pipe(writeStream);
}
findAndWrite('89.123.1.41');
findAndWrite('34.48.240.111');

// Вывод на экран
//readStream.pipe(transformStream).pipe(process.stdout);
 