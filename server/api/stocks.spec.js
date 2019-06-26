const {
  expect
} = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Stock routes', () => {
  describe('GET /api/stock/:ticker', () => {
    it('should get open and current prices for a ticker', async () => {
      const ticker = 'AAPL';
      const res = await request(app)
        .get(`/api/stocks/${ticker}`)
        .expect(200);
      expect(res.body).to.be.an('object');
    });
  });
});
