import chai from 'chai';
import chaiHttp from 'chai-http';
import UserController from '../controllers/UserController'
import app from '../routes/Index';
import seeds from '../db/seeds/Index';
import db from '../models/Index'

process.env.NODE_ENV = 'test';

const should = chai.should();
const roles = seeds.legitRoles;
const users = seeds.legitUsers;
const invalidUsers = seeds.invalidUsers;
const admin = {};
const user = {};

chai.use(chaiHttp);
/**
 *
 *
 */

describe('User API Spec', () => {

  let adminUserToken;
  let regUserToken;
  before((done) => {

    chai.request(app)
    .post('/users/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .end((error, response) => {
        adminUserToken = response.body.token;
      });

    chai.request(app)
    .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .end((error, response) => {
        regUserToken = response.body.token;
        done();
      });
  });

   describe('Users Information' , () => {

     it('GET /users => should get the admin list of all users', (done) => {
       chai.request(app)
        .get('/users')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Listing available users');
          done();
        });
     });
   });



});
