import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT,
  pghost: process.env.PGHOST,
  pguser: process.env.PGUSER,
  pgdb: process.env.PGDATABASE,
  pgpassword: process.env.PGPASSWORD,
  pgport: process.env.PGPORT,
};
