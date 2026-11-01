import request from 'supertest';
import app from './app';
import { getDb } from './db';

describe('test POST /register/device/:id', () => {
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

describe('test GET /list', () => {
  test('List devices successfully', async () => {
    const res = await request(app).get('/list');

    const expected = [
        {
            "id": "1",
            "type": "light",
            "value": 100,
            "history": [
                {
                    "type": "registered",
                    "timestamp": "2024-06-10T12:00:00Z"
                }
            ]
        },
        {
            "id": "2",
            "type": "thermostat",
            "value": 22,
            "history": [
                {
                    "type": "updated",
                    "timestamp": "2024-06-10T12:01:00Z",
                    "before": {
                        "value": 21
                    },
                    "after": {
                        "value": 22
                    }
                },
                {
                    "type": "registered",
                    "timestamp": "2024-06-10T12:00:00Z"
                }
            ]
        },
        {
            "id": "3",
            "type": "sensor",
            "value": 50,
            "history": [
                {
                    "type": "registered",
                    "timestamp": "2024-06-10T12:00:00Z"
                }
            ]
        }
    ]

    expect(res.body).toEqual(expected);
    expect(res.status).toBe(200);

    expect(getDb().devices).toContainEqual(expected);
  });
});

describe('test GET /device/:id', () => {
  test('Get device by ID route', async () => {
    const res = await request(app).get('/device/1');

    const expected = {
      "id": "1",
      "type": "light",
      "value": 100,
      "history": [
        {
          "type": "registered",
          "timestamp": "2024-06-10T12:00:00Z"
        }
      ]
    };

    expect(res.body).toEqual(expected);
    expect(res.status).toBe(200);
  });

  test('Get device by ID that doesnt exist', async () => {
    const res = await request(app).post('/register/device/4');

    expect(res.body).toEqual({ "error": "device with id 4 not found" });
    expect(res.status).toBe(404);
  });

  test('Get device by ID that is wrong', async () => {
    const res = await request(app).post('/register/device/hello');

    expect(res.body).toEqual({ "error": "device id must be a number" });
    expect(res.status).toBe(400);
  });
});

describe('Test app.ts', () => {
  test('Update device by ID route', async () => {
    const res = await request(app).patch('/device/1');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });

  test('Delete device by ID route', async () => {
    const res = await request(app).delete('/device/1');
    expect(res.body).toEqual({ message: "Miley, what's good?" });
  });
});