import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/Index.js';
import seeds from '../db/seeds/Index.js';

const should = chai.should();
const users = seeds.legitUsers;
const invalidUser = seeds.invalidUsers;

chai.use(chaiHttp);

describe('User API Spec', () => {
  let adminUserToken;
  let regUserToken;
  before((done) => {
    chai.request(app)
    .post('/api/users/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .end((error, response) => {
        adminUserToken = response.body.token;
      });
    chai.request(app)
    .post('/api/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .end((error, response) => {
        regUserToken = response.body.token;
        done();
      });
  });

  describe('User Authentication', () => {
    it('should signup users successfully and set a token', (done) => {
      chai.request(app)
        .post('/api/users')
        .send({
          fName: 'See',
          lName: 'Meeee',
          email: 'imnew@example.com',
          username: 'newestone',
          password: 'hardquestions'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('User was successfully created');
          res.body.data.username.should.equal('newestone');
          should.exist(res.body.token);
          done();
        });
    });
    it('should not signup users if required fields are missing', (done) => {
      chai.request(app)
        .post('/api/users')
        .send(invalidUser[1])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Fill the required fields');
          done();
        });
    });
    it('should not sign up a user with an already existing email or username', (done) => {
      chai.request(app)
        .post('/api/users')
        .send(users[2])
        .end((err, res) => {
          res.should.have.status(409);
          res.body.message.should.equal('Email or username already exists');
          done();
        });
    });
    it('should return a token on signin', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send({
          email: users[2].email,
          password: users[2].password
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('You were successfully logged in');
          should.exist(res.body.token);
          done();
        });
    });
    it('should not sign in a user if required fields are missing', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send({
          email: users[2].email
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Invalid login credentials');
          done();
        });
    });
    it('should not sign in a non-registered user', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send({
          email: 'notthere@example.com',
          password: 'hastalavista'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equal('No user was found');
          done();
        });
    });
    it('should not sign in a user if password is invalid', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send({
          email: users[2].email,
          password: 'ninitena'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Invalid login credentials');
          done();
        });
    });
  });

  describe('Get Users', () => {
    it('should get a list of all users', (done) => {
      chai.request(app)
        .get('/api/users')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Listing available users');
          done();
        });
    });
    it('should require a token before listing available users', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Verification failed');
          done();
        });
    });
    it('should not allow access to the list of users if the token is invalid', (done) => {
      chai.request(app)
        .get('/api/users')
        .set('authorization', 'hdfhf743u43brf97dhewhurvgy382hch')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Invalid token');
          done();
        });
    });
    it('should search for a user by id', (done) => {
      chai.request(app)
        .get('/api/users/4')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('User found!');
          should.exist(res.body.data);
          done();
        });
    });
    it('should return an error message if the user was not found', (done) => {
      chai.request(app)
        .get('/api/users/4098')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('The user was not found');
          done();
        });
    });
  });

  describe('User Search', () => {
  });

  describe('User Documents', () => {
  });

  describe('User Updating', () => {
    it('should allow a user to update their data', (done) => {
      chai.request(app)
        .put('/api/users/4')
        .set('authorization', regUserToken)
        .send({
          email: 'jk@example.com'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('User updated successfully');
          should.exist(res.body.data);
          done();
        });
    });
  });

  describe('User Deletion', () => {
    it('should allow an admin to delete a user\'s account', (done) => {
      chai.request(app)
        .delete('/api/users/5')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('User was deleted successfully');
          done();
        });
    });
  });

  describe('User Logout', () => {
    it('should log a user out', (done) => {
      chai.request(app)
        .post('/api/users/logout')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('You were logged out successfully');
          done();
        });
    });
    it('should require a user to have a valid token to be logged out', (done) => {
      chai.request(app)
        .post('/api/users/logout')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Verification failed');
          done();
        });
    });
  });
});
