require('dotenv/config')

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env

module.exports = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/entity/**/!(*.spec).ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}
