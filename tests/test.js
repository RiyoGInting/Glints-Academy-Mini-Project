const request = require("supertest");
const app = require("../index");

const { user, review, movie, category, cast } = require("../models");
let token;

beforeAll(async () => {
  await Promise.all([user.deleteMany(), review.deleteMany()]);
  token = await initialData()
});

const initialData = async() => {
  const res = await request(app).post('/auth/signup').send({
    email: "fikriztm@gmail.com",
    password: "!Default1",
    confirmPassword: "!Default1",
    name: "ikhz",
    role: "admin"
  })
  return res.body.token
}

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
      expect(res.body.message).toEqual("Token Created")
      expect(res.body).toHaveProperty("token")
    })
  })
})