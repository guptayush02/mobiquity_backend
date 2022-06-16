const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect
chai.use(chaiHttp);
const server = require("../server")
const req = require('./mockDb/atm')

const token = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.1s1C2OmieDsVf1hOSt0ygeZk6WYXf9nX2uzTbDwbR4Q'
// We can group similar tests inside a describe block
describe("ATM Controller", () => {
  before(() => {
    console.log( "This part executes once before all tests" );
  });

  after(() => {
    console.log( "This part executes once after all tests" );
  });

  describe("create", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning atm create successfully", async() => {
      const result = await chai.request(server).post('/api/v1/atm').set('token', token).send(req.success)
      expect(result.body.code).to.equal(200);
    });

    it("Is returning atm create params missing", async() => {
      const result = await chai.request(server).post('/api/v1/atm').set('token', token).send(req.missing_params)
      expect(result.body.code).to.equal(400);
    });

  });

  describe("atm list", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning get all atm list successfully", async() => {
      const result = await chai.request(server).get('/api/v1/atm-lists').set('token', token)
      expect(result.body.code).to.equal(200);
      expect(result.body.body.length).to.be.above(0)
    });

    it("Is returning get all atm list filter by city successfully", async() => {
      const result = await chai.request(server).get('/api/v1/atm-lists?city=Berlin').set('token', token)
      expect(result.body.code).to.equal(200);
      expect(result.body.body.length).to.be.above(0)
    });

  })

  describe("atm delete", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning delete atm successfully", async() => {
      const result = await chai.request(server).delete('/api/v1/atm/1').set('token', token)
      expect(result.body.code).to.equal(200);
      expect(result.body.body.length).to.be.above(0)
    });

  })

  describe("atm update", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning update atm successfully", async() => {
      const result = await chai.request(server).put('/api/v1/atm/2').set('token', token).send(req.update)
      expect(result.body.code).to.equal(200);
    });

  })

  describe("List of cities", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning lists of cities", async() => {
      const result = await chai.request(server).get('/api/v1/city-list').set('token', token)
      expect(result.body.code).to.equal(200);
    });

  })

});
