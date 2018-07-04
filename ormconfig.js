require('dotenv/config')

// https://github.com/typeorm/typeorm/blob/b5161e82294352eec8e9d82ebe28f214998d18d2/src/connection/options-reader/ConnectionOptionsEnvReader.ts#L56
function convertTrue(arg) {
  if (arg === '1' || arg === 'TRUE' || arg === 'true') {
    return true
  } else {
    return arg
  }
}

/**
 * 객체를 입력받아, `TEST_`로 시작하는 속성이 다른 속성을 대체하는 새 객체를 반환하는 함수
 * @param {object} env 임의의 객체
 * @returns {object} 일부 속성을 대체한 새 객체
 */
function withTestEnv(env) {
  const nonTestEntries = {}
  const testEntries = {}
  const testPattern = /^TEST_(.+)$/
  for (const [key, value] of Object.entries(env)) {
    const match = key.match(testPattern)
    if (match) {
      testEntries[match[1]] = convertTrue(value)
    } else {
      nonTestEntries[key] = convertTrue(value)
    }
  }
  return {
    ...nonTestEntries,
    ...testEntries,
  }
}

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING,
} = withTestEnv(process.env)

module.exports = [
  {
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: DB_LOGGING,
    synchronize: false,
    entities: ['src/entity/**/!(*.spec).ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
]
