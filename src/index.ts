import express, { Request, Response, json, urlencoded } from 'express';
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/errorMiddleware';
import morgan from 'morgan';
import { PoolClient } from 'pg';
import config from './config/config';
import db from './database/database';
import postRoutes from './routes';
const app = express();

const port = config.port ?? 4001;
db.connect().then(async (client: PoolClient) => {
  const res = await client.query('SELECT NOW()');
  console.log(res.rows);
});
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use(postRoutes);
app.use(errorMiddleware);
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Ohh! You Are Lost!!!',
  });
});

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
