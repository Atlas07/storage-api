const { encryptString, decryptString } = require('../crypt');

// TODO: test other func

describe('test encryptString', () => {
  it('should return object if ecryption has been successfuly done', () => {
    const mockStr = 'sometimes the same is different';
    const mockPass = '1234_haha';

    const encrypted = encryptString(mockStr, mockPass);

    expect(encrypted.IV).toBeDefined();
    expect(encrypted.data).toBeDefined();
  });

  it('should return Error if text or password fields not provided', () => {
    const mockStr = 'sometimes the same is different';
    const mockPass = '1234_haha';

    const encrypted1 = encryptString(mockStr);
    const encrypted2 = encryptString(null, mockPass);
    const encrypted3 = encryptString();

    expect(encrypted1).toMatchObject(new Error('Missed fields'));
    expect(encrypted2).toMatchObject(new Error('Missed fields'));
    expect(encrypted3).toMatchObject(new Error('Missed fields'));
  });

  it('should return Error if text or password fields not strings', () => {
    const encrypted1 = encryptString(123, 456);
    const encrypted2 = encryptString({}, []);

    expect(encrypted1).toMatchObject(new Error('text and password should be strings'));
    expect(encrypted2).toMatchObject(new Error('text and password should be strings'));
  });
});

describe('test decryptString', () => {
  it('should return string if decryption has been successfuly done', () => {
    const mockStr = {
      IV: 'affa40fb74765a95b2ad670153bb5791',
      data: '1nBAtundzxzytfp9hm6ysCgVye0GpBy1zax/ZvDvBu8=',
    };
    const mockPass = '1234_haha';

    const decrypted = decryptString(mockStr, mockPass);

    expect(decrypted).toBe('sometimes the same is different');
  });

  it('should return Error if no IV or data fields provided', () => {
    const mockStr1 = {
      IV: 'affa40fb74765a95b2ad670153bb5791',
    };
    const mockStr2 = {
      data: '1nBAtundzxzytfp9hm6ysCgVye0GpBy1zax/ZvDvBu8=',
    };
    const mockStr3 = {};
    const mockPass = '1234_haha';

    const decrypted1 = decryptString(mockStr1, mockPass);
    const decrypted2 = decryptString(mockStr2, mockPass);
    const decrypted3 = decryptString(mockStr3, mockPass);

    expect(decrypted1).toMatchObject(
      new Error('Missed fields. Encrypted should contain data and IV fields'),
    );
    expect(decrypted2).toMatchObject(
      new Error('Missed fields. Encrypted should contain data and IV fields'),
    );
    expect(decrypted3).toMatchObject(
      new Error('Missed fields. Encrypted should contain data and IV fields'),
    );
  });

  it('should return Error if no password provided', () => {
    const mockStr = {
      IV: 'affa40fb74765a95b2ad670153bb5791',
      data: '1nBAtundzxzytfp9hm6ysCgVye0GpBy1zax/ZvDvBu8=',
    };

    const decrypted1 = decryptString(mockStr);
    const decrypted2 = decryptString(mockStr, null);

    expect(decrypted1).toMatchObject(new Error('Missed password'));
    expect(decrypted2).toMatchObject(new Error('Missed password'));
  });
});
