import express from "express";
import { config } from 'dotenv'
import reservationRoute from "@routes/reservationRouter";
import cors from 'cors';
import morgan from "morgan";
import { run, dbRedis } from "@seeder/fileSeeder";

//------------------------Pets WS Server------------------------------------------//
const app = express();
config();
const PORT = Number(process.env.PORT) || 8080;

run()
  .then(() => {
    //middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("tiny"));
    app.use(cors());

    //setup route path
    app.use("/api", reservationRoute);

    // listen for requests
    const server = app.listen(PORT, () => {
      console.log(`===== Server is running on port ${PORT}! =====`);
    });

    process.once('SIGTERM', async () => {
      server.close(() => {
        dbRedis.end()
        console.log('===== Server closed =====');
        process.exit(0);
      });
    });

    process.once('SIGINT', async () => {
      server.close(() => {
        dbRedis.end()
        console.log('===== Server closed =====');
        process.exit(0);
      });
    });
  })
  .catch(err => {
    dbRedis.end()
    console.error(err.message);
    process.exit(1);
  });

export default app;
