const db = require('../../data/db-config')
const User = require('./users-model')

test('sanity', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
  
  beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('users').truncate()
    await db.seed.run()
  })
  afterAll(async () => {
    await db.destroy()
  })

  describe('users model', () => {
    describe('insert', () => {
      test('returns the inserted row', async () => {
        const input = { name: 'bilbo' }
        const bilbo = await User.insert(input)
        expect(bilbo).toMatchObject({ "id": 10, "name": "bilbo" })
      })
    })
    describe('delete', () => {
        test('returns the deleted row', async () => {
          const input = { id: 10, name: 'bilbo' }
          await User.remove(input)
          const deleted = await User.insert(input)
          expect(deleted).toMatchObject({ "id": 10, "name": "bilbo" })
        })
      })
  })
  