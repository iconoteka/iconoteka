const fse = require('fs-extra');
const getIconName = require('./getIconName');
const getStyleObject = require('./getStyleObject');

async function getFiles(dir) {
  const dirName = dir.split('/').reverse()[0];
  const contents = await fse.readdir(dir);

  const data = contents.map(async (fileName) => {
    
    const stats = await fse.stat(`${dir}/${fileName}`);

    if (stats.isDirectory()) {
      return getFiles(`${dir}/${fileName}`);
    }
    
    const styles = getStyleObject(fileName);

    const name = getIconName(fileName);

    return Promise.resolve({
      ...styles,
      name,
      fileName,
      path: `${dirName}/${fileName}`,
    });

  });

  return {
    name: dirName,
    items: await Promise.all(data),
  };
}

getFiles('iconoteka')
  .then(files => fse.writeFileSync('iconoteka.json', JSON.stringify(files, null, 2)));
