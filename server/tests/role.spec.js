import chai from 'chai';
import chaiHttp from 'chai-http';
import RoleController from '../controllers/RoleController'
import app from '../routes/Index';
import seeds from '../db/seeds/Index';
import db from '../models/Index'

process.env.NODE_ENV = 'test';

const should = chai.should();
const roles = seeds.legitRoles;
const users = seeds.legitUsers;
const invalidRoles = seeds.invalidRoles;
const admin = {};
const user = {};

chai.use(chaiHttp);

describe('Role API Spec', () => {

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
      console.log(adminUserToken);
      console.log(regUserToken);
  });

   describe('Admin Role' , () => {
     it('POST => should be able to create roles', (done) => {
       chai.request(app)
       .post('/roles')
        .set('authorization', adminUserToken)
        .send(roles[2])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('The role was created successfully');
          res.body.role.title.should.equal(roles[2].title);
          done();
        });
     })
   });



});
