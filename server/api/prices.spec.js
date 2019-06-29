const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('..');

xdescribe('Routes to get price info', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('GET /api/prices/:ticker', () => {
    it('should return stock info based on ticker', async () => {
      let ticker = 'AAPL';
      const res = await request(app)
        .get(`api/prices/${ticker}`)
        .expect(200);
      expect(res.body).to.be.an('object');
    });
  });
});
