import express, { Application, Request, Response} from 'express';
import { getDb } from './db';

const app: Application = express();

app.post('/register/device/:id', (req: Request, res: Response): void => {
  res.json({ message: "Miley, what's good?" });
  // Create an endpoint to register a new IoT device. The API should accept the necessary details to uniquely identify and describe the device.
  // The response should return the details of the registered device, including a unique identifier.
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