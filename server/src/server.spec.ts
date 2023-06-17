import request from 'supertest';
import server from './server';

describe('Server', () => {
  it('should respond with 200 OK', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello, world!');
  });
});
