const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const baseUrl = 'localhost:3000';
const TEST_FILE_DETAILS = [
    {
        fileId: 'file001',
        date: 155898454,
        userId: 'USER001',
        fileName : 'File Name 1',
        fileType : 'image'
    },
    {
        fileId: 'file002',
        date: 155898464,
        userId: 'USER002',
        fileName : 'File Name 2',
        fileType : 'image'
    }
];

const MISSING_FILE_DETAILS = [
    {
        date: 155898454,
        userId: 'USER001'
    },
    {
        fileId: 'file002',
        userId: 'USER002'
    },
    {
        fileId: 'file002',
        date: 155898464
    }
];
chai.use(chaiHttp);
describe('File Store', () => {


    it('should return error when body is missing', done => {

            chai.request(baseUrl)
                .put('/create-file-detail-test')
                .end((err, res)=> {
                    res.should.have.status(404);
                    done();
                });

        });

    it('should return error when fileId is missing', done => {

        chai.request(baseUrl)
            .put('/create-file-detail-test')
            .send(MISSING_FILE_DETAILS[0])
            .end((err, res)=> {
                res.should.have.status(404);
                done();
            });

    });

    it('should return error when date is missing', done => {

            chai.request(baseUrl)
                .put('/create-file-detail-test')
                .send(MISSING_FILE_DETAILS[1])
                .end((err, res)=> {
                    res.should.have.status(404);
                    done();
                });

    });
    it('should return error when userId is missing', done => {

                chai.request(baseUrl)
                    .put('/create-file-detail-test')
                    .send(MISSING_FILE_DETAILS[2])
                    .end((err, res)=> {
                        res.should.have.status(404);
                        done();
                    });

    });

    it('should save file details', done => {

        chai.request(baseUrl)
            .post('/create-file-detail-test')
            .send(TEST_FILE_DETAILS[0])
            .end((err, res)=> {
                res.should.have.status(200);
                done();
            });

    });

    it('should return file details', done => {

        chai.request(baseUrl)
            .get(`/file/${TEST_FILE_DETAILS[0].fileId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.a('object');
                done();
            });

    });
});
