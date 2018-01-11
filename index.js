const fs = require('fs');

const THE_FILE = `${process.env.PWD}/files/file`;
const FILE_COPY = `${process.env.PWD}/files/copy`;

const writeCopyReadFile = async (str, file, copy) => {
  let writeFun = await writeFile(str, file);

  let copyFun = await copyFile(file, copy);

  let readFun = await readFile(copy);

  return {writeFun, copyFun, readFun}
};


const writeFile = (str, file) => {
  const buf = Buffer.from(str, 'utf-8');

  console.log(buf);

  fs.writeFile(file, str, (err) => {
    console.log(err, 'Write file');
  });
};

const copyFile = (fromFile, destFile) => {
  const fr = fs.createReadStream(fromFile);
  const to = fs.createWriteStream(destFile);

  fr.pipe(to)
    .on('finish', () => {console.log('Copy done')})
};

const readFile = (file) => {
  fs.readFile(file, (err, data) => {
    console.log(err, data, 'Read done');
  });
};

writeCopyReadFile('Hello', THE_FILE, FILE_COPY);