const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../routes/Index.js');

process.env.NODE_ENV = 'test';

const should = chai.should();
chai.use(chaiHttp);

describe('/GET Index Route', () => {
  it('should return the welcome message', (done) => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.message.should.equal('Welcome to Hati!');
      done();
    });
  });
});
