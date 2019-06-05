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

    it('throw error if user already exists', async () => {
      const mockErrMsg = 'Mock err msg';
      const toAuthJSON = jest.fn();
      const setPassword = jest.fn();
      const save = jest.fn().mockRejectedValue({
        toAuthJSON,
        errors: {
          email: {
            message: mockErrMsg,
          },
        },
      });

      const MockModel = function MockModel(data) {
        return {
          ...data,
          save,
          setPassword,
        };
      };
      const user = UserService(MockModel);

      try {
        await user.create('test@gmail.com', 'pass');
      } catch (error) {
        expect(error).toBe(mockErrMsg);
        expect(save.mock.calls.length).toBe(1);
        expect(setPassword.mock.calls.length).toBe(1);
        expect(toAuthJSON.mock.calls.length).toBe(0);
      }
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

    it('throw err if invalid credentials provided', async () => {
      const toAuthJSON = jest.fn();
      const isValidPassword = jest.fn().mockReturnValue(false);
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

      try {
        await user.find('test@gmail.com', 'pass');
      } catch (error) {
        expect(error).toMatchObject(new Error());
        expect(findOne.mock.calls.length).toBe(1);
        expect(isValidPassword.mock.calls.length).toBe(1);
        expect(toAuthJSON.mock.calls.length).toBe(0);
      }
    });
  });
});
