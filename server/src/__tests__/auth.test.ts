import { describe, it, before } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "..";
import UserModel from "../database/models/user.model";
import TokenModel from "../database/models/token.model";

const expect = chai.expect;

chai.use(chaiHttp);

describe("Authorization API tests", () => {
  before((done) => {
    TokenModel.truncate({ cascade: true });
    UserModel.truncate({ cascade: true });
    done();
  });

  it("registers user correctly", (done) => {
    const AUTH_CREDENTIALS = {
      username: "testuser",
      password: "testpassword",
    };

    chai
      .request(app)
      .post("/auth/registration")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.not.have.property("refreshToken");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("id");
        expect(res.body.user)
          .to.have.property("username")
          .to.equal(AUTH_CREDENTIALS.username);
        expect(res.body.user).to.have.property("role").to.equal("USER");

        done();
      });
  });

  it("fails registration when credentials are not specified", (done) => {
    const AUTH_CREDENTIALS = {};

    chai
      .request(app)
      .post("/auth/registration")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("errors");
        expect(res.body.errors.length).to.be.equal(2);
        expect(res.body.errors[0]).to.a("string");
        done();
      });
  });

  it("fails registration if user already exists", (done) => {
    const AUTH_CREDENTIALS = {
      username: "testpassword",
      password: "testpassword",
    };

    chai
      .request(app)
      .post("/auth/login")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("fails registration if request body validation fails", (done) => {
    const AUTH_CREDENTIALS = {
      username: "testuser",
      password: "1",
    };

    chai
      .request(app)
      .post("/auth/registration")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("errors");
        expect(res.body.errors).to.be.a("array");
        expect(res.body.errors[0]).to.be.a("string");
        expect(res.body.errors[0]).to.match(/мінімум/u);
        done();
      });
  });

  it("logins registered user correctly", (done) => {
    const AUTH_CREDENTIALS = {
      username: "testuser",
      password: "testpassword",
    };

    chai
      .request(app)
      .post("/auth/login")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body).not.to.have.property("refreshToken");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("id");
        expect(res.body.user)
          .to.have.property("username")
          .to.equal(AUTH_CREDENTIALS.username);
        expect(res.body.user).to.have.property("role").to.equal("USER");
        done();
      });
  });

  it("fails login when user is unregistered", (done) => {
    const AUTH_CREDENTIALS = {
      username: "unregistered_user",
      password: "testpassword",
    };

    chai
      .request(app)
      .post("/auth/login")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("fails login if password is incorrect", (done) => {
    const AUTH_CREDENTIALS = {
      username: "testuser",
      password: "wrong_password",
    };

    chai
      .request(app)
      .post("/auth/login")
      .send(AUTH_CREDENTIALS)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("errors");
        expect(res.body.errors).to.have.length(0);
        done();
      });
  });
});
