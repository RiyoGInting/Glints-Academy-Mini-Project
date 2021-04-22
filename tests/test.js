const request = require("supertest");
const app = require("../index");

const { user, review, movie, category, cast } = require("../models");

beforeAll(async () => {
  // await Promise.all([user.deleteMany(), review.deleteMany()]);
  await Promise.all([
    category.deleteMany({name: 'Randoms'}),
    cast.deleteMany({name: 'Randoms'}),
    user.deleteOne({email: 'fikriztm@gmail.com'}),
    review.deleteMany()
  ])
});

describe("Categories Test", ()=> {
  describe("/category/", ()=> {
    it("it give all categories", async ()=> {
      const res = await request(app).get('/category/').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Get All Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it give one categories", async ()=> {
      const res = await request(app).get('/category/6077cbb513212953207129d1').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Get One Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it create one categories", async ()=> {
      const res = await request(app).post('/category/').send({
        name: 'Random'
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Create Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it update one categories", async ()=> {
      const find = await category.findOne({name: 'Random'})
      const res = await request(app).put(`/category/${find._id}`).send({
        name: 'Randoms'
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Update Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it update one categories", async ()=> {
      const find = await category.findOne({name: 'Randoms'})
      const res = await request(app).delete(`/category/${find._id}`).send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Delete Data")
      expect(res.body).toHaveProperty("deleted")
    })
  })
})

describe("Casts Test", ()=> {
  describe("/cast/", ()=> {
    it("it should get all casts", async ()=> {
      const res = await request(app).get('/cast').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Get All Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it should get one casts", async ()=> {
      const res = await request(app).get('/cast/607b97b914bdf13575eb7179').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Get One Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it should create one casts", async ()=> {
      const res = await request(app).post('/cast/').send({
        name: "Random"
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Create Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it should update one casts", async ()=> {
      const find = await cast.findOne({name: 'Random'})
      const res = await request(app).put(`/cast/${find._id}`).send({
        name: 'Randoms'
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Update Data")
      expect(res.body).toHaveProperty("data")
    })
    it("it should delete one casts", async ()=> {
      const find = await cast.findOne({name: 'Randoms'})
      const res = await request(app).delete(`/cast/${find._id}`).send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Delete Data")
      expect(res.body).toHaveProperty("deleted")
    })
  })
})
let tokenAdmin;
describe("Auth and User Test", ()=> {
  describe("/auth/", ()=> {
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
    
    it("it should login user and return the token", async ()=> {
      const res = await request(app).post('/auth/signin').send({
        email: "fikriztm@gmail.com",
        password: "!Default1",
      })
      tokenAdmin = res.body.token
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("token")
    })
    it("it should get user ", async ()=> {
      const find = await user.findOne({email: "fikriztm@gmail.com"})
      const res = await request(app)
        .get(`/user/`)
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
    it("it should update user ", async ()=> {
      // const find = await user.findOne({email: "fikriztm@gmail.com"})
      const res = await request(app)
        .put(`/user/`)
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({ name: 'ikhzz' })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
  })
})

describe("Review Test", ()=> {
  describe("/review/", ()=> {
    it("it should return review current user", async ()=> {
      const res = await request(app)
        .get('/review/')
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("dataReview")
    })
  })
  describe("/review/", ()=> {
    it("it should return review other user", async ()=> {
      const find = await user.findOne({email: "fikriztm@gmail.com"})
      const res = await request(app)
        .get(`/review/${find._id}`)
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("userReview")
    })
  })
  describe("/review/", ()=> {
    it("it should create review", async ()=> {
      const res = await request(app)
        .post(`/review/`)
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({
          review: 'bla bla bla',
          rating: 1,
          movieId: '607bba9714bdf13575eb7187'
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("createReview")
    })
  })
  describe("/review/", ()=> {
    it("it should update review", async ()=> {
      const find = await review.findOne({'review': 'bla bla bla'})
      const res = await request(app)
        .put(`/review/${find._id}`)
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({
          review: 'bla bla bla',
          rating: 5,
          movieId: '607bba9714bdf13575eb7187'
        })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
  })
  describe("/review/", ()=> {
    it("it should delete review", async ()=> {
      const find = await review.findOne({'review': 'bla bla bla'})
      const res = await request(app)
        .delete(`/review/${find._id}`)
        .set('Authorization', `bearer ${tokenAdmin}`)
        .send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Delete review success")
    })
  })
})

describe("Movie Test", ()=> {
  describe("/movie/", ()=> {
    it("get all movie", async ()=> {
      const res = await request(app).get('/movie/').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("result")
    })
  })
  describe("/movie/category", ()=> {
    it("get all movie by category", async ()=> {
      const res = await request(app).get('/movie/category/6077cbb513212953207129d1').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Get Category")
      expect(res.body).toHaveProperty("result")
    })
  })
  describe("/movie/title", ()=> {
    it("get all movie by title", async ()=> {
      const res = await request(app).get('/movie/title/avenger').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success Get Title by Search")
      expect(res.body).toHaveProperty("result")
    })
  })
  describe("/movie/detail", ()=> {
    it("get all movie by detail", async ()=> {
      const res = await request(app).get('/movie/detail/607bba9714bdf13575eb7187').send({})

      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty("result")
    })
  })
})