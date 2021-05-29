const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwtsecret";

const hashPassword = require("../helpers/hashPassword");

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}
let access_token;
let token_user_2;
let user = {
  username: "siotong",
  password: hashPassword("abc123"),
  email: "otong@mail.com",
  userDesc: "Hanyalah seorang pemuda yang mengoleksi kertas karton yugioh",
  location: "Stardew Valley",
  createdAt: new Date(),
  updatedAt: new Date(),
};

let user2 = {
  username: "lilynano",
  password: hashPassword("lalalili"),
  email: "lilynano@mail.com",
  userDesc: "new Co&Co passionate collector", //default value?
  location: "Zuzu City",
  createdAt: new Date(),
  updatedAt: new Date(),
};
beforeAll((done) => {
  User.create(user)
    .then((result) => {
      access_token = generateToken({
        email: result.email,
        id: result.id,
      });
      return User.create(user2);
    })
    .then((result) => {
      token_user_2 = generateToken({
        email: result.email,
        id: result.id,
      });
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", null, { truncate: true, cascade: true }) //{truncate: true}
    .then(() => {
      return queryInterface.bulkDelete("Showcases", null, {
        truncate: true,
        cascade: true,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /showcases sukses", () => {
  it.only("it responds with ", (done) => {
    request(app)
      .get("/showcases")
      .send({ id: 1 })
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
      .send({ id: 1676923 })
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
      .send({
        name: "showcase",
      })
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        console.log(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty(
          "msg",
          "Showcase has been succesfully created"
        );
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
      .get("/showcases/177698")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "Showcase not found");
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
      .send({
        name: "newName",
      })
      .set({ access_token: access_token, Accept: "application/json" })
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
describe("PATCH /showcases/:id gagal tidak membawa access token", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/1")
      .send({
        name: "newName",
      })
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

describe("PATCH /showcases/:id gagal access token tidak sesuai userId", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/1")
      .send({
        name: "newName",
      })
      .set({ access_token: token_user_2, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(
          "error",
          "You ara not authorized to perform this action"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /showcases/:id gagal nama tidak diisi", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/1")
      .send({
        name: "",
      })
      .set({ access_token: access_token, Accept: "application/json" })
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

describe("DELETE /showcases/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/showcases/1")
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "msg",
          "showcase has been successfully deleted"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /showcases/:id gagal tidak membawa access token", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/showcases/1")
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

describe("DELETE /showcases/:id gagal access token tidak sesuai userId", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/showcases/1")
      .set({ access_token: token_user_2, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(
          "error",
          "You ara not authorized to perform this action"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /showcases/:id gagal showcase tidak ditemukan", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/showcases/463463")
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "Showcase not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
