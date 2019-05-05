const getFiles = require('../utils/getFiles');
const getStyle = require('../utils/getStyle');
const getIconName = require('../utils/getIconName');
describe('Categories test', () => {

    const files = getFiles('iconoteka');

    Object.values(files.items).forEach(element => {
        const name = typeof element === 'object' ? element.name : element
        test(`Category "${name}" should have name and icons`, () => {
            expect(typeof element.name).toBe('string');
            expect(element.items.length).toBeGreaterThanOrEqual(1);
        })
    });


    Object.values(files.items).forEach(element => {
        if (typeof element === 'object') {
            element.items.forEach(item => {
                test(`Icon ${item} should have correct style and thickness`, () => {
                  const { thickness, style } = getStyle(item);
                    expect(thickness).toBeDefined();
                    expect(style).toBeDefined();
                });

                test(`Icon ${item} should have non-empty name`, () => {
                  const name = getIconName(item);
                    expect(typeof name).toBe('string');
                    expect(name.length).toBeGreaterThan(0);
                });
            });
        }
    });
});