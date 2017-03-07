import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import UserController from '../controllers/UserController'
import app from '../routes/Index';
import seeds from '../db/seeds/Index';
import db from '../models/Index'

dotenv.config({ silent: true });

process.env.NODE_ENV = 'test';

const should = chai.should();
const roles = seeds.validRoles;
const users = seeds.validUsers;
const invalidUsers = seeds.invalidUsers;
const admin = {};
const user = {};

chai.use(chaiHttp);

describe('User Spec', () => {
  /**
   *
   *
   */
   describe('/GET Users' , () => {
     it('should get a list of all users', (done) => {
       chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
     });
   });



});
