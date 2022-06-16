const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect
chai.use(chaiHttp);
const server = require("../server")
const req = require('./mockDb/user')

// We can group similar tests inside a describe block
describe("User Controller", () => {
  before(() => {
    console.log( "This part executes once before all tests" );
  });

  after(() => {
    console.log( "This part executes once after all tests" );
  });

  describe("login", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning login successfully", async() => {
      const result = await chai.request(server).post('/api/v1/login').send(req.login.success_body)
      expect(result.body.code).to.equal(200);
    });

    it("Is returning login failed email not exists", async() => {
      const result = await chai.request(server).post('/api/v1/login').send(req.login.email_not_exists)
      expect(result.body.code).to.equal(400);
    });

    it("Is returning login failed password not match", async() => {
      const result = await chai.request(server).post('/api/v1/login').send(req.login.password_not_match)
      expect(result.body.code).to.equal(400);
    });

    it("Is returning login failed password not match", async() => {
      const result = await chai.request(server).post('/api/v1/login').send(req.login.params_not_exists)
      expect(result.body.code).to.equal(400);
      expect(result.body.message).to.equal('Email and password are require fields');
    });

  });


  // signup function
  describe("singup", () => {
    beforeEach(() => {
      console.log( "executes before every test" );
    });

    it("Is returning signup successfully", async() => {
      const result = await chai.request(server).post('/api/v1/signup').send(req.signup.success_body)
      expect(result.body.code).to.equal(200);
    });

    it("Is returning signup failed email not exists", async() => {
      const result = await chai.request(server).post('/api/v1/signup').send(req.signup.user_already_exists)
      expect(result.body.code).to.equal(400);
    });

    it("Is returning signup failed password not match", async() => {
      const result = await chai.request(server).post('/api/v1/signup').send(req.signup.missing_params)
      expect(result.body.code).to.equal(400);
      expect(result.body.message).to.equal('Email and password are require fields');
    });

  });
});
