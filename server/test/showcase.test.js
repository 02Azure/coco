const request = require("supertest");
const app = require("../app");
const { sequelize, User, Showcase } = require("../models");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const JWT_SECRET = process.env.JWT_SECRET
=======
const JWT_SECRET = process.env.JWT_SECRET;
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5

const hashPassword = require("../helpers/hashPassword");

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}
let access_token;
let token_user_2;
let user = {
<<<<<<< HEAD
<<<<<<< HEAD
  username: "siotong",
  password: hashPassword("abc123"),
  email: "otong@mail.com",
  userDesc: "Hanyalah seorang pemuda yang mengoleksi kertas karton yugioh",
  location: "Stardew Valley",
  createdAt: new Date(),
  updatedAt: new Date(),
=======
=======
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
  username: 'siotong',
  password: hashPassword('abc123'),
  email: 'otong@mail.com',
  userDesc: 'Hanyalah seorang pemuda yang mengoleksi kertas karton yugioh',
  location: 'Stardew Valley',
  createdAt: new Date(),
  updatedAt: new Date()
<<<<<<< HEAD
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
};

let user2 = {
  username: "lilynano",
  password: hashPassword("lalalili"),
  email: "lilynano@mail.com",
  userDesc: "new Co&Co passionate collector", //default value?
  location: "Zuzu City",
  createdAt: new Date(),
<<<<<<< HEAD
<<<<<<< HEAD
  updatedAt: new Date(),
};
beforeAll((done) => {
  User.create(user)
    .then((result) => {
      access_token = generateToken({
        email: result.email,
=======
=======
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
  updatedAt: new Date()
}

let showcase1 = {
  UserId: 1,
  name: 'Si atk tak terhingga',
  isStarred: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

let showcase2 = {
  UserId: 1,
  name: 'showcase dua',
  isStarred: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

let showcase3 = {
  UserId: 1,
  name: 'showcase tiga',
  isStarred: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

let showcase4 = {
  UserId: 1,
  name: 'showcase 4',
  isStarred: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

beforeAll((done) => {
  User.create(user)
    .then((result) => {
        access_token = generateToken({
        username: result.username,
<<<<<<< HEAD
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
        id: result.id,
      });
      return User.create(user2);
    })

    .then((result) => {
      token_user_2 = generateToken({
        username: result.username,
        id: result.id,
      })
      return Showcase.create(showcase1)
    })

    .then(() => {
      return Showcase.create(showcase2)
    })

    .then(() => {
      return Showcase.create(showcase3)
    })

    .then(() => {
      return Showcase.create(showcase4)
    })

    .then(() => {
      done()
    }) 

    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
<<<<<<< HEAD
<<<<<<< HEAD
    .bulkDelete("Users", null, { truncate: true, cascade: true }) //{truncate: true}
    .then(() => {
      return queryInterface.bulkDelete("Showcases", null, {
        truncate: true,
        cascade: true,
      });
=======
    .bulkDelete("Users",null,{truncate:true, restartIdentity:true, cascade:true}) 
    .then(() => {
      queryInterface.bulkDelete("Showcases",null,{truncate:true, restartIdentity:true, cascade:true});
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
    .bulkDelete("Users",null,{truncate:true, restartIdentity:true, cascade:true}) 
    .then(() => {
      queryInterface.bulkDelete("Showcases",null,{truncate:true, restartIdentity:true, cascade:true});
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
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
<<<<<<< HEAD
<<<<<<< HEAD
      .send({ id: 1676923 })
=======
      .send({id:432})
      .set("Accept", "application/json")
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
      .send({id:432})
      .set("Accept", "application/json")
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "User not found");
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
<<<<<<< HEAD
<<<<<<< HEAD
      .set({ access_token: access_token, Accept: "application/json" })
=======
      .set({access_token: access_token,"Accept": "application/json"})
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
      .set({access_token: access_token,"Accept": "application/json"})
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
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
      .set({access_token: access_token,"Accept": "application/json"})
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body.error).toContain("name cannot be empty")
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
        expect(body).toHaveProperty("UserId", expect.any(Number));
        expect(body).toHaveProperty("name", expect.any(String));
        expect(body).toHaveProperty("isStarred", expect.any(Boolean)); 
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
<<<<<<< HEAD
<<<<<<< HEAD
      .get("/showcases/177698")
=======
      .get("/showcases/13232")
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
      .get("/showcases/13232")
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
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
        expect(body).toHaveProperty("msg", "Showcase name has been successfully updated");
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
<<<<<<< HEAD
<<<<<<< HEAD
        expect(body).toHaveProperty(
          "error",
          "You are not authorized to perform this action"
        );
=======
        expect(body).toHaveProperty("error", "You are not authorized to perform this action");
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
        expect(body).toHaveProperty("error", "You are not authorized to perform this action");
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
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
        expect(body.error).toContain("name cannot be empty")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

<<<<<<< HEAD
<<<<<<< HEAD
describe("DELETE /showcases/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/showcases/1")
      .set({ access_token: access_token, Accept: "application/json" })
=======
=======
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
describe("PATCH /showcases/:id/star sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/1/star")
      .set({access_token:access_token, Accept: "application/json" })
<<<<<<< HEAD
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
<<<<<<< HEAD
<<<<<<< HEAD
        expect(body).toHaveProperty(
          "msg",
          "showcase has been successfully deleted"
        );
=======
        expect(body).toHaveProperty("msg", "Showcase starred status has been successfully updated");
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
        expect(body).toHaveProperty("msg", "Showcase starred status has been successfully updated");
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /showcases/:id/star gagal - jumlah maksimum starred tercapai", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcases/4/star")
      .set({access_token:access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "You can only have maximum 3 starred showcases at the same time");
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
<<<<<<< HEAD
<<<<<<< HEAD
        expect(body).toHaveProperty(
          "error",
          "You are not authorized to perform this action"
        );
=======
        expect(body).toHaveProperty("error", "You are not authorized to perform this action");
>>>>>>> fce0c11ca622b06276bf4b85f8150c36f553b3a5
=======
        expect(body).toHaveProperty("error", "You are not authorized to perform this action");
>>>>>>> ceb6ba9244b8f99caf834fcaed1864a69691ca08
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
      .set({ access_token:access_token,"Accept": "application/json"})
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "Showcase has been successfully deleted");
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
