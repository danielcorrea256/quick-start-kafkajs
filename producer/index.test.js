const multiply = require('./multiply')

test('multiply 2 and 5 to get 10', () => {
    expect(multiply(2,5)).toBe(10);
})