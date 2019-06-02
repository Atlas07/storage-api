const { isValidPassword } = require('./validation');

test('should return false if length less than 8', () => {
  expect(isValidPassword('1')).toBe(false);
  expect(isValidPassword('123A_a')).toBe(false);
  expect(isValidPassword('aha_H12')).toBe(false);
  expect(isValidPassword('')).toBe(false);
});

test('should return false if password is not string', () => {
  expect(isValidPassword({})).toBe(false);
  expect(isValidPassword(12345678)).toBe(false);
  expect(isValidPassword([])).toBe(false);
  expect(isValidPassword(() => {})).toBe(false);
});

test('should return true, if password length more that 8, at least one has upper case, lower case, number, special symbol', () => {
  expect(isValidPassword('some_String8')).toBe(true);
  expect(isValidPassword('someSString8')).toBe(false);
  expect(isValidPassword('1234567)')).toBe(false);
});
