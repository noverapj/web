import * as tedious from "tedious";
import * as tarn from "tarn";
import { Kysely, MssqlDialect } from "kysely";
import { LosaGame } from "./types/LosaGame";
import { LosaLogData } from "./types/LosaLogData";

const LosaGameDialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: () =>
      new tedious.Connection({
        authentication: {
          options: {
            password: process.env.DB_GAME_PASSWORD,
            userName: process.env.DB_GAME_USER || "sa",
          },
          type: "default",
        },
        options: {
          database: "LosaGame",
          port: parseInt(process.env.DB_GAME_PORT!, 10) || 1433,
          trustServerCertificate: true,
        },
        server: process.env.DB_GAME_HOST || "localhost",
      }),
  },
});

const LosaLogDataDialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: () =>
      new tedious.Connection({
        authentication: {
          options: {
            password: process.env.DB_LOG_PASSWORD,
            userName: process.env.DB_LOG_USER || "sa",
          },
          type: "default",
        },
        options: {
          database: "LosaLogData",
          port: parseInt(process.env.DB_LOG_PORT!, 10) || 1433,
          trustServerCertificate: true,
        },
        server: process.env.DB_LOG_HOST || "localhost",
      }),
  },
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
const LosaGameDB = new Kysely<LosaGame>({
  dialect: LosaGameDialect,
});

const LosaLogDB = new Kysely<LosaLogData>({
  dialect: LosaLogDataDialect,
});

export { LosaGameDB, LosaLogDB };
