import request from 'supertest';
import app from './app';
import { getDb } from './db';

describe('test /register/device/:id', () => {
  test('Register device successfully', async () => {
    const res = await request(app).post('/register/device/4').send({
      type: 'light',
      value: 100,
    });

    const expected = {
      id: '4',
      type: 'light',
      value: 100,
      history: [
        {
          type: 'registered',
          timestamp: expect.any(String),
        },
      ],
    };

    expect(res.body).toEqual(expected);
    expect(res.status).toBe(200);

    expect(getDb().devices).toContainEqual(expected);
  });

  test('Register device with existing id', async () => {
    const res = await request(app).post('/register/device/1').send({
      type: 'light',
      value: 100,
    });

    expect(res.body).toEqual({ "error": "id already exists" });
    expect(res.status).toBe(409);
  });

  test('Register device with bad id', async () => {
    const res = await request(app).post('/register/device/hello').send({
      type: 'light',
      value: 100,
    });

    expect(res.body).toEqual({ "error": "id must be a number" });
    expect(res.status).toBe(400);
  });

  test('Register device with bad type', async () => {
    const res = await request(app).post('/register/device/4').send({
      type: 1,
      value: 100,
    });

    expect(res.body).toEqual({ "error": "type must be a string" });
    expect(res.status).toBe(400);
  });

  test('Register device with bad value', async () => {
    const res = await request(app).post('/register/device/4').send({
      type: 'light',
      value: 'hello',
    });

    expect(res.body).toEqual({ "error": "value must be a number" });
    expect(res.status).toBe(400);
  });
});

describe('Test app.ts', () => {
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