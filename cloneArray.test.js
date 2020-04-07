const cloneArr = require('./cloneArray');


test('properly clone array', () => {
  const arr = [1,2,3]
  expect(cloneArr(arr)).toEqual(arr);
})

