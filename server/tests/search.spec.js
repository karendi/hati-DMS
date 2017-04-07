const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../routes/Index.js');
const seeds = require('../db/seeds/Index.js');

const should = chai.should();
const users = seeds.legitUsers;

chai.use(chaiHttp);


describe('Search Spec', () => {
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

  describe('Search Documents', () => {
    it('should show a regular user search results from public documents', (done) => {
      chai.request(app)
        .get('/api/search/documents/?q=book')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Search results from public documents');
          done();
        });
    });
    it('should show an admin search results from all documents', (done) => {
      chai.request(app)
        .get('/api/search/documents/?q=book')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Search results from all documents');
          done();
        });
    });
    it('should ensure the search query is not blank', (done) => {
      chai.request(app)
        .get('/api/search/documents/?q')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.body.message.should.equal('Input a valid search term');
          done();
        });
    });
    it('should ensure a message if no results were found', (done) => {
      chai.request(app)
        .get('/api/search/documents/?q=ehbssbhf')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('No results were found');
          done();
        });
    });
    // it('should search for a unique word in title', (done) => {
    //   chai.request(app)
    //     .get('/api/search/documents/?q=nyumbani')
    //     .set('authorization', regUserToken)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.data.title.should.equal('Ever heard of Nyumbani');
    //       done();
    //     });
    // });
    // it('should search for a unique word in content', (done) => {
    //   chai.request(app)
    //     .get('/api/search/documents/?q=maskani')
    //     .set('authorization', regUserToken)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.data.content.should.equal('It is similar to Maskani');
    //       done();
    //     });
    // });
  });

  describe('Search Users', () => {
    it('should search for a user by username', (done) => {
      chai.request(app)
        .get('/api/search/users/?q=dmuchemi')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Search Results!');
          res.body.data.result[0].username.should.equal('dmuchemi');
          done();
        });
    });
    it('should return a message if the search query is invalid or empty', (done) => {
      chai.request(app)
        .get('/api/search/users/?q=')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Input a valid search term');
          done();
        });
    });
    it('should ensure a message if no results were found', (done) => {
      chai.request(app)
        .get('/api/search/users/?q=hfgsbs')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('No results were found');
          done();
        });
    });
  });
});
