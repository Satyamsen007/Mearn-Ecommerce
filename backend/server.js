import { app } from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
dotenv.config({
  path: './.env'
});
//Handling uncaught exception
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1)
});


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Working on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);  // Exit the process with an error code
  })