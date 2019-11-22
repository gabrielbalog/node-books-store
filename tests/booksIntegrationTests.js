require('should');

const request = require('supertest');
const moongose = require('mongoose');

process.env.ENV = 'test';

const app = require('../app');

const Book = moongose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return read and _it', (done) => {
    const bookPost = { title: 'My Book', author: 'Jon', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    moongose.connection.close();
    app.server.close(done());
  });
});