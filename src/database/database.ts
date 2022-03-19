import config from '../config/config';
import { Pool } from 'pg';
// import { migrate } from 'postgres-migrations';

const pool = new Pool({
  database: config.pgdb,
  host: config.pghost,
  user: config.pguser,
  port: parseInt(`${config.pgport}`),
  password: config.pgpassword,
});
pool.on('error', (err) => {
  console.error(err.message);
});
export default pool;
