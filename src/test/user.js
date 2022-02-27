import app from "../src/server";
import expected from "chai";
import request from "supertest";

const { expect } = expected;


describe("/GET", () => {
  it("should return a message", (done) => {
    request(app).get("/")
      .end((err, res) => {
        const body = res.body;
        expect(200)
        expect(body.message).to.be.equals("WELCOME TO ALPHA USER SERVICE AUTOMATION");
        done();
      });
  });
});