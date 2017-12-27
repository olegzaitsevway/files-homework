const fs = require('fs');

const THE_FILE = `${process.env.PWD}/files/file`;
const FILE_COPY = `${process.env.PWD}/files/file.copy`;

const writeFile =  (str) => {
  const buf = Buffer.from(str, 'utf-8');

  console.log(buf);

  fs.writeFile(THE_FILE, str, (err) => {
    console.log('ERR', err);
  });
};

const appendFile = (str) => {
  fs.appendFile(THE_FILE, str, (err) => {
    console.log('ERR', err);
  });
};

const readFile = () => {
  fs.readFile(THE_FILE, (err, data) => {
    console.log(err, data);
  });
};

// const copyFile = () => {
//   fs.copyFile(THE_FILE, FILE_COPY, (err) => {
//     console.log(err);
//   });
// }

const copyFile = (fromFile, destFile) => {
  const fr = fs.createReadStream(fromFile);
  const to = fs.createWriteStream(destFile);

  fr.pipe(to)
    .on('finish', () => {console.log('done')})
}

// не будет работать на старой версии ноды

const renameFile = (oldName, newName) => {
  fs.rename(oldName, newName, (err) => {
    console.log(err);
  });
};

const removeFile = (pathToFile) => {
  fs.unlink(pathToFile, (err) => {
    console.log(err);
  });
};

const symLink = (link) => {
  fs.symlink(THE_FILE, link, (err) => {
    console.log(err);
  });
};

const statFile = (file) => {
  fs.open(file, 'r', (err, fd) => {
    if (err) {
      console.log('OPEN ERR:', err);
      return;
    }

    fs.fstat(fd, (err, stats) => {
      console.log(err);
      console.log(stats);
    })
  })
};

// statFile(THE_FILE);

// symLink('files/link');

// removeFile('files/newestName');

// renameFile('newName', 'files/newestName');

// appendFile('I love you all\n');

// writeFile('Hello guys\n');

// readFile();

copyFile(THE_FILE, 'files/copy');

// const base64 = Buffer.from('Hello', 'utf-8').toString('base64');
// console.log(base64);
// const str = Buffer.from(base64, 'base64').toString('utf-8');
// console.log(str);
