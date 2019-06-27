const {
  expect
} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('Stock routes', () => {
  // describe('POST /api/stock/', () => {
  //   let stockInfo = {
  //     ticker: 'GOOGL',
  //     quantity: 1,
  //     userId: 1
  //   };
  //   it('should get open and current prices for a ticker', async () => {
  //     const res = await request(app)
  //       .post('/api/stock')
  //       .send(stockInfo)
  //       .expect(200);
  //     expect(res.body).to.be.an('object');
  //   });

  //   // it('should not get prices for an invalid ticker', async () => {
  //   //   const ticker = '123RANDOM';
  //   //   await request(app)
  //   //     .get(`/api/stocks/${ticker}`)
  //   //     .expect(400);

  //   // });
  // });

  describe('POST /api/stock/', () => {
   User.create({

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
        .post('/api/stock')
        .send(stockInfo)
        .expect(200);
      // expect(res.body).to.be.an('object');
    });
  });
});
