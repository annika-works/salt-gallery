/**
 * @jest-environment jsdom
 */

const index = require('./index');

test('searchbuttononclick', () => {
  index.searchInput.value = 'cats';
  index.searchBtn.click();
  expect(index.page.toBe(1));
  expect(index.search.toBe('cats'));
});
