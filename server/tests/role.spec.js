import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/Index';
import seeds from '../db/seeds/Index';

process.env.NODE_ENV = 'test';

const should = chai.should();
const users = seeds.legitUsers;

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
  });

  describe('Role Creation', () => {
    it('should allow an admin to create roles', (done) => {
      chai.request(app)
        .post('/roles')
        .set('authorization', adminUserToken)
        .send({
          title: 'sensei'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('The role was created successfully');
          res.body.role.title.should.equal('sensei');
          done();
        });
    });
    it('should not allow a regular user to create roles', (done) => {
      chai.request(app)
        .post('/roles')
        .set('authorization', regUserToken)
        .send({
          title: 'nothappening'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not create a role is title wasn\'t given', (done) => {
      chai.request(app)
        .post('/roles')
        .set('authorization', adminUserToken)
        .send({
          title: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Title cannot be blank');
          done();
        });
    });
    it('should not create duplicate role titles', (done) => {
      chai.request(app)
        .post('/roles')
        .set('authorization', adminUserToken)
        .send({
          title: 'user'
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.message.should.equal('Role already exists');
          done();
        });
    });
  });

  describe('Get Roles', () => {
    it('should allow an admin to view all roles', (done) => {
      chai.request(app)
        .get('/roles')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Listing available roles');
          should.exist(res.body.data);
          done();
        });
    });
    it('should not let a regular user view roles', (done) => {
      chai.request(app)
        .get('/roles')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should allow an admin to view a specific role', (done) => {
      chai.request(app)
        .get('/roles/3')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Role found!');
          should.exist(res.body.data);
          done();
        });
    });
    it('should not let a regular user view a specific role', (done) => {
      chai.request(app)
        .get('/roles/3')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should return a message if role was not found', (done) => {
      chai.request(app)
      .get('/roles/345673')
      .set('authorization', adminUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('Role was not found');
        done();
      });
    });
  });

  describe('Update Roles', () => {
    it('should allow the admin to update a role', (done) => {
      chai.request(app)
      .put('/roles/3')
        .set('authorization', adminUserToken)
        .send({
          title: 'shifu'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Role was updated successfully');
          done();
        });
    });
    it('should not allow a regular user to update a role', (done) => {
      chai.request(app)
      .put('/roles/3')
        .set('authorization', regUserToken)
        .send({
          title: 'woi'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not update a role that does not exist', (done) => {
      chai.request(app)
      .put('/roles/33345256')
        .set('authorization', adminUserToken)
        .send({
          title: 'notgonnahappen'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Role was not found');
          done();
        });
    });
    it('should not update a role if title is not given', (done) => {
      chai.request(app)
      .put('/roles/3')
        .set('authorization', adminUserToken)
        .send({
          title: ''
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Title cannot be empty');
          done();
        });
    });
  });

  describe('Delete Role', () => {
    it('should allow an admin to delete roles', (done) => {
      chai.request(app)
      .delete('/roles/3')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Role was successfully deleted');
          done();
        });
    });
    it('should prevent a regular user from deleting roles', (done) => {
      chai.request(app)
      .delete('/roles/2')
        .set('authorization', regUserToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not delete non-existent roles', (done) => {
      chai.request(app)
      .delete('/roles/2336')
        .set('authorization', adminUserToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Role was not found');
          done();
        });
    });
  });
});
