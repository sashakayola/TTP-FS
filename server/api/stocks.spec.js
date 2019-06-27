const {
  expect
} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

xdescribe('Stock routes', () => {
  describe('POST /api/stock/', () => {
   User.create({
        userId: 1,
        firstName: 'Sandy',
        lastName: 'Cheeks',
        email: 'sandy@gmail.com',
        password: '123',
        balance: 5000
      });


    let stockInfo = {
      tickerL: 'AAPL',
      quantity: 1,
      userId: 1
    };

    it('should post a single user', async () => {
      await request(app)
        .post('/api/stock/buy')
        .send(stockInfo)
        .expect(200);
      // expect(res.body).to.be.an('object');
    });
  });
});
