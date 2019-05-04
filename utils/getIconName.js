const capitalize = require('./capitalize');

module.exports = function getIconName(filename) {
  if (!filename.includes('iconoteka_')) {
    console.warn('filename should starts with iconoteka_', filename);
    return null;
  }

  const name = filename
    .split('.svg')[0]
    .split('iconoteka_')[1]
    .split('__')[0]
    .split('_')
    .filter(word => word.length > 1)
    .map(word => capitalize(word))
    .join(' ');

  if (!name) {
    console.warn(`Cannot extract icon name from ${filename}`);
  }

  return name;
};
