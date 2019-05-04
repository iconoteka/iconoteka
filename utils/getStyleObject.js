const getStyle = require('./getStyle');
module.exports = function getStyleObject(fileName) {
    const { style, thickness } = getStyle(fileName);

    return {
      isFill: style === 'fill' || style === 'all',
      isStroke: style === 'stroke' || style === 'all',
      isBold: thickness === 'bold' || thickness === 'all',
      isMedium: thickness === 'medium' || thickness === 'all',
      isRegular: thickness === 'regular' || thickness === 'all',
      isLight: thickness === 'light' || thickness === 'all',
    }
}
