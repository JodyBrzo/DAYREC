module.exports = {
  development: {
    username: "root",
    password: "snowPlants45",
    database: "dayrec_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "snowPlants45",
    database: "dayrec_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
