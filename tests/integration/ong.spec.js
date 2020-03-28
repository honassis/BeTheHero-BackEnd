const request  = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG', ()=>{
    beforeEach( async()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })
    afterAll(async ()=>{
        await connection.destroy()
    })
    it('should be able to create new ong', async ()=>{
      const response = await request(app)
      .post('/ongs')
      .send({
            name: "test",
            email: "oministack@dsada.com",
            whatsapp: "85985377813",
            city: "cras",
            uf: "SP"
           });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
    })
});
