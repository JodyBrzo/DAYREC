module.exports = {
  development: {
    username: "root",
    password: process.env.DB_Password,
    database: "dayrec_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.DB_Password,
    database: "dayrec_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
