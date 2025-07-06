describe('env validation', () => {
  const originalEnv = process.env.DATABASE_URL;

  afterEach(() => {
    process.env.DATABASE_URL = originalEnv;
    jest.resetModules();
  });

  it('throws when DATABASE_URL is missing', () => {
    delete process.env.DATABASE_URL;
    jest.resetModules();
    expect(() => require('./env')).toThrow();
  });

  it('returns DATABASE_URL when present', () => {
    process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/db';
    jest.resetModules();
    const env = require('./env');
    expect(env.DATABASE_URL).toBe('postgres://user:pass@localhost:5432/db');
  });
});
