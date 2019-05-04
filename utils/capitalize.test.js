const capitalize = require('./capitalize');

it('Capitalizes string', () => {
  expect(capitalize('test')).toEqual('Test');
  expect(capitalize('multiple words')).toEqual('Multiple words');
});

it('Keeps capitalized strings untouched', () => {
  expect(capitalize('Test')).toEqual('Test');
});

