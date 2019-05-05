const fse = require('fs-extra');

module.exports = function getFiles(dir, callback = file => file) {
  const dirName = dir.split('/').reverse()[0];
  const contents = fse.readdirSync(dir);

  const data = contents.map((fileName) => {
    const fullPath = `${dir}/${fileName}`;
    const stats =  fse.statSync(fullPath);

    if (stats.isDirectory()) {
      return getFiles(fullPath, callback);
    }

    return callback(fileName, fullPath);

  });

  return {
    name: dirName,
    items: data,
  };
}
