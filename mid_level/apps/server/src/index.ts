import app from './app';

const PORT: number = 5050;

app.listen(PORT, (): void => {
  console.log(`Server is running on ${PORT}...`);
});