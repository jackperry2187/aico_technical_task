import express, { Application, type Request, type Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/test', (req: Request, res: Response): void => {
  res.json({ "test": "working" });
});

export default app;