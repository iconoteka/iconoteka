const getIconName = require('./getIconName');
const getStyleObject = require('./getStyleObject');

module.exports = function prepareIconObject(fileName, fullPath) {    
    const styles = getStyleObject(fileName);

    const name = getIconName(fileName);

    return {
      ...styles,
      name,
      fileName,
      path: fullPath,
    };
}