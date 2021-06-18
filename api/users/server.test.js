const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')


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
  
  test('sanity', () => {
    expect(true).toBeTruthy()
  })

  describe('[POST] /', () => {
    it('returns a status 201 CREATED', async () => {
      const res = await request(server).post('/api/users').send({ name: 'bilbo' })
      expect(res.status).toBe(201)
    })
    it('returns newly created user', async () => {
      const res = await request(server).post('/api/users').send({ name: 'bilbo' })
      // console.log(res)
      expect(res.body).toMatchObject({ id: 10, name: 'bilbo' })
    })
  })
  describe('[DELETE] /', () => {
    it('returns a status 200 CREATED', async () => {
      const res = await request(server).delete('/api/users/6')
      expect(res.status).toBe(200)
    })
    it('returns deleted user', async () => {
        const res = await request(server).delete('/api/users/6')
        expect(res.body).toMatchObject({ id: 6, name: 'Boromir' })
    })
  })