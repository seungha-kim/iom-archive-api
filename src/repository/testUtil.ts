import { Connection, EntityManager, getConnection } from 'typeorm'

export const withTx = (f: (manager: EntityManager) => Promise<any>) => {
  return async () => {
    const connection = getConnection()
    const qr = connection.createQueryRunner()
    await qr.connect()
    await qr.startTransaction()
    await f(qr.manager)
    await qr.rollbackTransaction()
  }
}
