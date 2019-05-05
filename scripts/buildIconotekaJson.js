const fse = require('fs-extra');

const getFiles = require('../utils/getFiles');
const prepareIconObject = require('../utils/prepareIconObject');

const files = getFiles('iconoteka', prepareIconObject);

fse.writeFileSync('iconoteka.json', JSON.stringify(files, null, 2));
