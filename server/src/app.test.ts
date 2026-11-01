import request from 'supertest';
import app from './app';

describe('Test app.ts', () => {
  test('Register device route', async () => {
    const res = await request(app).post('/register/device/1');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });

  test('List devices route', async () => {
    const res = await request(app).get('/list');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });

  test('Get device by ID route', async () => {
    const res = await request(app).get('/device/1');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });

  test('Update device by ID route', async () => {
    const res = await request(app).patch('/device/1');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });

  test('Delete device by ID route', async () => {
    const res = await request(app).delete('/device/1');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });
});