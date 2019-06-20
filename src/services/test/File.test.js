const FileService = require('../File');

describe('FileService test', () => {
  it('has a module', () => {
    expect(FileService).toBeDefined();
  });

  describe('File.create test', () => {
    it('creates new file', async () => {
      const setPassword = jest.fn();
      const save = jest.fn().mockResolvedValue({});

      const MockModel = function MockModel(data) {
        return {
          ...data,
          save,
          setPassword,
        };
      };
      const file = FileService(MockModel);

      await file.create('filename');

      expect(save.mock.calls.length).toBe(1);
      expect(save.mock.calls.length).toBe(1);
    });
  });
});
