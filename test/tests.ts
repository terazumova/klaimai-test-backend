import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const app = 'http://localhost:3001';
const defaultUser = {
  fullname: 'test',
  email: 'test@test.te',
  password: 'test',
};
let token = '';
let authorId;

describe('GET /info', function () {
  it('Get company description', function (done) {
    request(app).get('/info').expect(200, done);
  });
});

describe('POST /register', function () {
  it('Register new user', function (done) {
    request(app).post('/register').send(defaultUser).expect(201, done);
  });
});

describe('POST /login', function () {
  it('Login user', function (done) {
    request(app)
      .post('/login')
      .send({ email: defaultUser.email, password: defaultUser.password })
      .end((err, res) => {
        token = res.body.data.token;
        res.should.have.status(201);

        done();
      });
  });
});

describe('GET /profile', function () {
  it('Get user information', function (done) {
    request(app).get(`/profile?token=${token}`).expect(200, done);
  });
});

describe('GET /profile / unauthorized user', function () {
  it('Get user information', function (done) {
    request(app).get('/profile?token=wrongtoken').expect(401, done);
  });
});

describe('GET /author', function () {
  this.timeout(6000);

  it('Get random author', function (done) {
    request(app)
      .get(`/author?token=${token}`)
      .end((err, res) => {
        authorId = res.body.data.authorId;
        res.should.have.status(200);

        done();
      });
  });
});

describe('GET /author / unauthorized user', function () {
  this.timeout(6000);

  it('Get random author', function (done) {
    request(app).get(`/author?token=wrongtoken`).expect(401, done);
  });
});

describe('GET /quote', function () {
  this.timeout(6000);

  it('Get random quote of random author', function (done) {
    request(app)
      .get(`/quote?token=${token}&authorId=${authorId}`)
      .expect(200, done);
  });
});

describe('GET /quote / unauthorized user', function () {
  this.timeout(6000);

  it('Get random quote of random author', function (done) {
    request(app)
      .get(`/quote?token=wrongtoken&authorId=${authorId}`)
      .expect(401, done);
  });
});

describe('DELETE /logout', function () {
  it('Logout user', function (done) {
    request(app).delete(`/logout?token=${token}`).expect(200, done);
  });
});

describe('DELETE /logout / unauthorized user', function () {
  it('Logout user', function (done) {
    request(app).delete('/logout?token=wrongtoken').expect(401, done);
  });
});
