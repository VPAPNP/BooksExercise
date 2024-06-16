const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../BooksExercise/server');
const e = require('express');
const expect = chai.expect;

chai.use(chaiHttp);
const body = { id: "4", title: 'New Book', author: 'New Author' };
describe('API Tests', () => {

    it('GET /books should return all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done(err);
            });

  
    });
    it('POST /books should add a new book', (done) => {
        chai.request(server)
            .post('/books')
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(body.id).to.equal(res.body.id);
                expect(res.body).to.have.property('title');
                expect(body.title).to.equal(res.body.title);
                expect(res.body).to.have.property('author');
                expect(body.author).to.equal(res.body.author);
                done(err);
            });
    }); 
    it('GET /books/:id should return a book by id', (done) => {
        
        chai.request(server)
            .get(`/books/4`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(body.id).to.equal(res.body.id);
                expect(res.body).to.have.property('title');
                expect(body.title).to.equal(res.body.title);
                expect(res.body).to.have.property('author');
                expect(body.author).to.equal(res.body.author);
                done(err);
            });
    });
    
    it('PUT /books/:id should update a book by id', (done) => {
          const bookId = "4";
          const updatedBook = {id:bookId,title: 'Updated Book', author: 'Updated Author'};
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(updatedBook.id).to.equal(res.body.id);
                expect(res.body).to.have.property('title');
                expect(updatedBook.title).to.equal(res.body.title);
                expect(res.body).to.have.property('author');
                expect(updatedBook.author).to.equal(res.body.author);
                (err);

               
            });
            done();

    });
   
    it('DELETE /books/:id should delete a book by id', (done) => {
        const bookId = "4";
        chai.request(server)
            .delete(`/books/${bookId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                
            });
            done();
    });
    it('Sholud return 404 if try PUT,GET,POST,DELETE a non existing book' , (done) => {

        chai.request(server)
            .get(`/books/100`)
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
        chai.request(server)
            .put(`/books/100`)
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
        chai.request(server)
            .delete(`/books/100`)
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
        chai.request(server)
            .post(`/books/100`)
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
        done();
        

           
            
    });
    
    

   

});
