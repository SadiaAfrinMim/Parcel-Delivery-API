import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

async function startServer() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
