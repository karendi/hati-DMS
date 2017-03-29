const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../routes/Index.js');
const seeds = require('../db/seeds/Index.js');

const should = chai.should();
const users = seeds.legitUsers;
const docs = seeds.legitDocs;

chai.use(chaiHttp);

describe('Document API Spec', () => {
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

  describe('Create Documents', () => {
    it('should allow a user to create a document', (done) => {
      chai.request(app)
        .post('/api/documents')
        .set('authorization', regUserToken)
        .send(docs[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('Document created successfully');
          done();
        });
    });
    it('should prevent a non-logged in user from creating documents', (done) => {
      chai.request(app)
        .post('/api/documents')
        .send(docs[0])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Verification failed');
          done();
        });
    });
    it('should ensure the title field is not blank', (done) => {
      chai.request(app)
        .post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: docs[2].content
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Title field cannot be blank');
          done();
        });
    });
    it('should ensure the content field is not blank', (done) => {
      chai.request(app)
        .post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: docs[2].title,
          content: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Content field cannot be blank');
          done();
        });
    });
    it('should return a message if both fields are blank', (done) => {
      chai.request(app)
        .post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Required fields cannot be blank');
          done();
        });
    });
  });

  describe('Update Documents', () => {
    it('should allow the owner of the document to update it', (done) => {
      chai.request(app)
        .put('/api/documents/6')
        .set('authorization', regUserToken)
        .send({
          title: 'Grab Some Books Already!',
          content: '',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('The document was updated successfully');
          should.exist(res.body.data);
          done();
        });
    });
    it('should not allow updating if both title and content fields are blank', (done) => {
      chai.request(app)
        .put('/api/documents/6')
        .set('authorization', regUserToken)
        .send({
          title: '',
          content: '',
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.equal('No update detected');
          done();
        });
    });
    it('should fail if the document wasn\'t found', (done) => {
      chai.request(app)
        .put('/api/documents/6753')
        .set('authorization', regUserToken)
        .send({
          title: 'A New Document',
          content: 'Gibberish, gibberish, gibberish',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('The document was not found');
          done();
        });
    });
  });

  describe('Delete Documents', () => {
    it('should allow the document owner to delete their document', (done) => {
      chai.request(app)
        .delete('/api/documents/6')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('The document was deleted successfully');
          done();
        });
    });
    it('should not allow non-logged in users to delete documents', (done) => {
      chai.request(app)
        .delete('/api/documents/5')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Verification failed');
          done();
        });
    });
    it('should fail if the document wasn\'t found', (done) => {
      chai.request(app)
        .delete('/api/documents/6753')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('The document was not found');
          done();
        });
    });
  });

  describe('View Documents', () => {
    it('should allow a regular user to view public documents', (done) => {
      chai.request(app)
        .get('/api/documents')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Listing public documents');
          done();
        });
    });
    it('should allow an admin to view all documents', (done) => {
      chai.request(app)
        .get('/api/documents')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Listing all documents');
          done();
        });
    });
    it('should allow a regular user access to a public document', (done) => {
      chai.request(app)
        .get('/api/documents/1')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Document found!');
          done();
        });
    });
    it('should not allow a regular user access to a private document', (done) => {
      chai.request(app)
        .get('/api/documents/2')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Permission denied');
          done();
        });
    });
    it('should allow a regular user access to a private document they own', (done) => {
      chai.request(app)
        .get('/api/documents/3')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Document found!');
          done();
        });
    });
    it('should return a message if the document doesn\'t exist', (done) => {
      chai.request(app)
        .get('/api/documents/3432')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('The document was not found');
          done();
        });
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
          res.body.message.should.equal('Search cannot be empty');
          done();
        });
    });
  });
});
