const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Holdings = db.model('holdings');

describe('Routes to get user info and login user', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  beforeEach(async () => {
    return await User.create({
      firstName: 'Bob',
      lastName: 'Sponge',
      email: 'bob@gmail.com',
      password: '123',
    });
  });

  describe('GET /api/users/', () => {
    it('should get a single user', async () => {
      const userId = 1;
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('POST /api/users/login', () => {
    let user = {
      email: 'bob@gmail.com',
      password: '123',
    };

    it('should login a single user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send(user)
        .expect(200);
      expect(res.body).to.be.an('object');
    });
  });
});

describe('Route to create a new user', () => {
  describe('POST /api/users/', () => {
    let user = {
      firstName: 'Sandy',
      lastName: 'Cheeks',
      email: 'sandy@gmail.com',
      password: '123',
    };

    it('should post a single user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send(user)
        .expect(201);
      expect(res.body).to.be.an('object');
    });
  });
});

describe('Route to get holdings info for a user', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('GET /api/users/:userId/holdings', () => {
    beforeEach(() => {
      User.create({
        firstName: 'Sandy',
        lastName: 'Cheeks',
        email: 'sandy@gmail.com',
        password: '123',
      });
      Holdings.create({
        ticker: 'AAPL',
        quantity: 5,
      });
      return;
    });

    it('should get holdings for a single user', async () => {
      const userId = 1;
      const res = await request(app)
        .get(`/api/users/${userId}/holdings`)
        .expect(200);
      expect(res.body).to.be.an('array');
    });
  });
});

describe('Route to create a transaction', () => {
  describe('POST /api/users/transactions', () => {
    let user = {
      firstName: 'Sandy',
      lastName: 'Cheeks',
      email: 'sandy@gmail.com',
      password: '123',
    };

    it('should post a single user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send(user)
        .expect(201);
      expect(res.body).to.be.an('object');
    });
  });
});

describe('Route to create a transaction', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe('POST /api/users/:userId/transactions', () => {
    User.create({
      userId: 1,
      firstName: 'Sandy',
      lastName: 'Cheeks',
      email: 'sandy@gmail.com',
      password: '123',
      balance: 5000,
    });

    let stockInfo = {
      tickerL: 'AAPL',
      quantity: 1,
    };

    it('should post a buy transaction', async () => {
      const userId = 1
      await request(app)
        .post(`/api/users/${userId}/transactions`)
        .send(stockInfo)
        .expect(201);
      // expect(res.body).to.be.an('object');
    });
  });
});
