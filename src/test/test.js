import app from "../server";
import chai from "chai";
import expected from "chai";
import request from "supertest"
import { account_number } from "../middleware/account_generator";
import chaiHttp from "chai-http";
import knex from "../db/knex";

chai.use(chaiHttp);

const { expect } = expected;

let user;
let users;
let new_user;
let token;
let fund_receiver;

describe("/GET", () => {
  before(done => {
    knex.delete().from("users").then(result => console.log(result));
    
    new_user = { 
      account_number: account_number(),
      first_name: "Monday", 
      last_name: "Malik", 
      email: "monday@domain.com", 
      phone: "08012345678", 
      password: "monday123" 
    }
    done()
  });
    
  it('it should create a new user', (done) => {
    request(app)
      .post('/users/post')
      .send(new_user)
      .end((err, res) => {
        const body = res.body;
        user = body.results[body.results.length - 1];
        fund_receiver = body.results[1];
        expect(200);
        expect(body.message).to.be.equals("Success");
        expect(res.status).to.equal(200);
        done();
    });
    
  });

  it("should login a user", done => {
    const data = {
      email: new_user.email,
      password: new_user.password
    }
    request(app)
      .post("/users/login")
      .send(data)
      .end((err, res) => {
        const body = res.body
        token = body.results.token
        expect(200);
        expect(body).to.have.instanceOf(Object);
        expect(body.message).to.equals("Login success");
        done();
      })
  });

  it('it should fetch all users', (done) => {
    request(app)
      .get('/users/list')
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        const body = res.body;
        users = body.results;
        expect(200)
        expect(body.message).to.equals("Success")
        done()
      });
    
  });

  it('it should make fund deposit', (done) => {
    const data = {
      amount: 20000, 
      receiver_acct_no: user.account_number, 
      sender_name: `${user.first_name} ${user.last_name}`, 
      receiver_name: `${user.first_name} ${user.last_name}`, 
      narrative: "fund deposit"
    }

    request(app)
      .post('/transactions/deposit')
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .end((err, res) => {
        const body = res.body;
        expect(200)
        expect(body.message).to.equals("Success")
        done()
      });
  });

  it('it should make fund withdraw', (done) => {
    const data = {
      amount: 5000, 
      debit_acct_no: user.account_number, 
      receiver_name: `${user.first_name} ${user.last_name}`, 
      narrative: "Withdraw", 
    }

    request(app)
      .post('/transactions/withdraw')
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .end((err, res) => {
        const body = res.body;
        expect(200)
        expect(body.message).to.equals("Success")
        done()
      });
    
  });

  it('it should make fund transfer', (done) => {
    const data = {
      receiver_acct_no: fund_receiver.account_number, 
      sender_name: `${user.first_name} ${user.last_name}`,
      amount: 5000, 
      debit_acct_no: user.account_number, 
      receiver_name: `${fund_receiver.first_name} ${fund_receiver.last_name}`, 
      narrative: "Payment for car repairs", 
    }

    request(app)
      .post('/transactions/transfer')
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .end((err, res) => {
        const body = res.body;
        expect(200)
        expect(body.message).to.equals("Success")
        done()
      });
    
  });
});