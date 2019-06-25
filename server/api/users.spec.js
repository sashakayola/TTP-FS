const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  describe('GET /api/users/', () => {
    beforeEach(() => {
      return User.create({
        firstName: 'Bob',
        lastName: 'Sponge',
        email: 'bob@gmail.com',
        password: '123',
      });
    });

    it('should get a single user', async () => {
      const userId = 1;
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('POST /api/users/', () => {
    let user = {
      firstName: 'Bob',
      lastName: 'Sponge',
      email: 'sponge@gmail.com',
      password: 'hello123',
    };

    it('should post a single user', async () => {
      const res = await request(app)
        .post(`/api/users`)
        .send(user)
        .expect(201);
      expect(res.body).to.be.an('object');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(() => {
      return User.create({
        firstName: 'Sandy',
        lastName: 'Cheeks',
        email: 'sandy@gmail.com',
        password: '123',
      });
    });

    let user = {
      email: 'sandy@gmail.com',
      password: '123',
    };

    it('should login a single user', async () => {
      const res = await request(app)
        .post(`/api/users/login`)
        .send(user)
        .expect(200);
      expect(res.body).to.be.an('object');
    });
  });
});
