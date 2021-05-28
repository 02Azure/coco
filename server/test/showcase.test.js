const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwtsecret";

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}
const access_token = generateToken()
let user = {
  email: "user@mail.com",
  password: "123456",
};
beforeAll((done) => {
  User.create(admin)
    .then((result) => {
      tokenAdmin = generateToken({
        email: result.email,
        id: result.id,
        isAdmin: result.isAdmin,
      });
      return User.create(customer);
    })
    .then((result) => {
      tokenCustomer = generateToken({
        email: result.email,
        id: result.id,
        isAdmin: result.isAdmin,
      });
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then(() => {
      return queryInterface.bulkDelete("Products");
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});


describe("GET /showcases sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcases")

      .set({ userId: 1, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("GET /showcases gagal, userId tidak ditemukan", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcases")

      .set({ userId: 5582, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "user not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /showcases sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/showcases")
      .send()
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        console.log(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("msg", "success showcase created");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /showcases gagal tidak membawa access token", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/showcases")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Invalid access token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("POST /showcases gagal, nama tidak diisi", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/showcases")
      .send({
        name: "",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("error", "name cannot be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /showcases/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcases/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("userId", expect.any(Number));
        expect(body).toHaveProperty("name", expect.any(String));
        expect(Array.isArray(body.ShowcaseItems)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /showcases/:id gagal, showcase id tidak ditemukan", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcases/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error","Showcase not found")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /showcases/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/1")
      .set({access_token:, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "success showcase editName");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("PATCH /showcases/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/4747")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("msg", "Showcase not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe("DELETE /showcases/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/showcases/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "success showcase delete");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
