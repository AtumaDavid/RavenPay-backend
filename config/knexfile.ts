// import dotenv from 'dotenv';

// dotenv.config();

// export default {
//   development: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: Number(process.env.DB_PORT),
//     },
//     migrations: {
//       directory: '/home/atuma-david/RavenPay/migrations',
//     },
//   },
// };

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export default {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    },
    migrations: {
      directory: '/home/atuma-david/RavenPay/migrations',
    },
  },
};
