const request = require("supertest");
const app = require("../index");

const { user, review, movie, category, cast } = require("../models");

beforeAll(async () => {
  await Promise.all([user.deleteMany(), review.deleteMany()]);
});


describe("Auth Test", ()=> {
  describe("/auth/signup POST", ()=> {
    it("it should create a user and return the token", async ()=> {
      const res = await request(app).post('/auth/signup').send({
        email: "fikriztm@gmail.com",
        password: "!Default1",
        confirmPassword: "!Default1",
        name: "ikhz",
        role: "admin"
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("token")
    })
  })
})