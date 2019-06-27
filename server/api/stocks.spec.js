const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

xdescribe('Routes for user transactions', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe('POST /api/stock/', () => {
    User.create({
      firstName: 'Sandy',
      lastName: 'Cheeks',
      email: 'sandy@gmail.com',
      password: '123',
      balance: 5000,
    });

    let stockInfo = {
      tickerL: 'AAPL',
      quantity: 1,
      userId: 1,
    };

    it('should post a buy transaction', async () => {
      await request(app)
        .post('/api/stock/buy')
        .send(stockInfo)
        .expect(201);
      // expect(res.body).to.be.an('object');
    });
  });
});
