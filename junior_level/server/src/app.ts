import express, { Application, Request, Response} from 'express';
import { Device, getDb, persist } from './db';

const app: Application = express();

app.use(express.json());

app.post('/register/device/:id', (req: Request, res: Response): void => {
  // register a new IoT device
  const id = String(req.params.id);
  const { type, value } = req.body;

  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    res.status(400).json({ error: 'id must be a positive number' });
    return;
  }

  if (typeof type !== 'string') {
    res.status(400).json({ error: 'type must be a string' });
    return;
  }

  if (typeof value !== 'number' || value < 0 || value > 100) {
    res.status(400).json({ error: 'value must be a number between 0 and 100' });
    return;
  }

  const db = getDb();

  if (db.devices.some((device) => device.id === id)) {
    res.status(409).json({ error: 'id already exists' });
    return;
  }

  const device = {
    id,
    type,
    value,
    history: [
      {
        type: 'registered',
        timestamp: new Date().toISOString(),
      },
    ],
  } as Device;

  db.devices.push(device);
  persist();

  res.status(200).json(device);
});

app.get('/list', (req: Request, res: Response): void => {
  // retrieve a list of all registered devices
  const db = getDb();
  res.json(db.devices);
});

app.get('/device/:id', (req: Request, res: Response): void => {
  // retrieve the details of a specific device by its unique identifier
  const id = String(req.params.id);

  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    res.status(400).json({ error: 'device id must be a positive number' });
    return;
  }

  const db = getDb();
  const device = db.devices.find((device) => device.id === id);

  if (!device) {
    res.status(404).json({ error: `device with id ${id} not found` });
    return;
  }

  res.status(200).json(device);
});

app.patch('/device/:id', (req: Request, res: Response): void => {
  // update the status or configuration of a specific device
  const id = String(req.params.id);

  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    res.status(400).json({ error: 'device id must be a positive number' });
    return;
  }

  const keys = Object.keys(req.body ?? {});

  if (keys.length !== 1 || keys[0] !== 'value') {
    res.status(400).json({ error: 'can only update value' });
    return;
  }

  const { value } = req.body;

  if (typeof value !== 'number' || value < 0 || value > 100) {
    res.status(400).json({ error: 'value must be a number between 0 and 100' });
    return;
  }

  const db = getDb();
  const device = db.devices.find((device) => device.id === id);

  if (!device) {
    res.status(404).json({ error: `device with id ${id} not found` });
    return;
  }

  const change = {
    before: { value: device.value },
    after: { value },
  };

  device.value = value;
  device.history.unshift({
    type: 'updated',
    timestamp: new Date().toISOString(),
    ...change,
  });

  persist();

  res.status(200).json(change);
});

app.delete('/device/:id', (req: Request, res: Response): void => {
  // delete a specific device from the system
  const id = String(req.params.id);

  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    res.status(400).json({ error: 'device id must be a number' });
    return;
  }

  const db = getDb();
  const index = db.devices.findIndex((device) => device.id === id);

  if (index === -1) {
    res.status(404).json({ error: `device with id ${id} not found` });
    return;
  }

  db.devices.splice(index, 1);
  persist();

  res.status(200).send();
});

export default app;