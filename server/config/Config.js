{
  "development": {
    "username": "",
    "password": "",
    "database": process.env.DATABASE_DEV_URL,
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "test": {
    "username": "",
    "password": "",
    "database": process.env.DATABASE_TEST_URL,
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "production": {
    "database": "DATABASE_URL",
    "dialect": "postgres"
  }
}
