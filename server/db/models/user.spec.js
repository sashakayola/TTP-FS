const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let sasha

      beforeEach(async () => {
        sasha = await User.create({
          firstName: 'Sasha',
          lastName: 'Kayola',
          email: 'sasha@gmail.com',
          password: 'ilovecheese123'
        })
      })

      it('returns true if the password is correct', () => {
        expect(sasha.correctPassword('ilovecheese123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(sasha.correctPassword('ilovecheeze')).to.be.equal(false)
      })
    })
  })
})
