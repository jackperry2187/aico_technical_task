import express, { Application, Request, Response} from 'express';
import { Device, getDb, persist } from './db';

const app: Application = express();

app.use(express.json());

app.post('/register/device/:id', (req: Request, res: Response): void => {
  // register a new IoT device
  const id = String(req.params.id);
  const { type, value } = req.body;

  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: 'id must be a number' });
    return;
  }

  if (typeof type !== 'string') {
    res.status(400).json({ error: 'type must be a string' });
    return;
  }

  if (typeof value !== 'number') {
    res.status(400).json({ error: 'value must be a number' });
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
  res.json({ message: "Miley, what's good?" });
  // Create an endpoint to retrieve the details of a specific device by its unique identifier.
});

app.patch('/device/:id', (req: Request, res: Response): void => {
  res.json({ message: "Miley, what's good?" });
  // Provide an endpoint to update the status or configuration of a specific device. This could be used, for example, to turn a light on or off, adjust a thermostat, etc.
  // The response should confirm the updated status or configuration.
});

app.delete('/device/:id', (req: Request, res: Response): void => {
  res.json({ message: "Miley, what's good?" });
  // Implement an endpoint to delete a specific device from the system. The response should confirm the deletion.
});

export default app;