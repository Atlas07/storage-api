const UserService = require('../User');

describe('UserService test', () => {
  it('has a module', () => {
    expect(UserService).toBeDefined();
  });

  describe('User.create test', () => {
    it('creates new user', async () => {
      const toAuthJSON = jest.fn();
      const save = jest.fn().mockResolvedValue({
        toAuthJSON,
      });
      const setPassword = jest.fn();

      const MockModel = function MockModel(data) {
        return {
          ...data,
          save,
          setPassword,
        };
      };
      const user = UserService(MockModel);

      await user.create('test@gmail.com', 'pass');

      expect(save.mock.calls.length).toBe(1);
      expect(setPassword.mock.calls.length).toBe(1);
      expect(toAuthJSON.mock.calls.length).toBe(1);
    });
  });

  describe('User.find test', () => {
    it('finds existed user', async () => {
      const toAuthJSON = jest.fn();
      const isValidPassword = jest.fn().mockReturnValue(true);
      const findOne = jest.fn().mockResolvedValue({
        toAuthJSON,
        isValidPassword,
        record: {},
      });

      const MockModel = function MockModel(data) {
        return {
          ...data,
          findOne,
        };
      };
      const user = UserService(MockModel());

      await user.find('test@gmail.com', 'pass');

      expect(findOne.mock.calls.length).toBe(1);
      expect(isValidPassword.mock.calls.length).toBe(1);
      expect(toAuthJSON.mock.calls.length).toBe(1);
    });
  });
});
