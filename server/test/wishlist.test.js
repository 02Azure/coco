const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

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

let wishlist = {
  name: "wishlist",
  image: "imgur.com",
  description: "kartu impian",
  price: 1000000,
  tag: "langka",
};

let editedWishlist = {
  name: "wishlist revisi",
  image: "imgurL.com",
  description: "kartu impian sejak lama",
  price: 1000788,
  tag: "langka sekali",
};

beforeAll((done) => {
  User.create(user)
    .then((result) => {
      access_token = generateToken({
        username: result.username,
        id: result.id,
      });
      return User.create(user2);
    })
    .then((result) => {
      token_user_2 = generateToken({
        username: result.username,
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
    .bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity:true }) //{truncate: true}
    .then(() => {
      return queryInterface.bulkDelete("WishlistItems", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /wishlist sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/wishlist")
      .set("Accept", "application/json")
      .send({ id: 1 })
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

describe("GET /wishlist gagal, userId tidak ditemukan", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/wishlist")
      .send({ id: 1676923 })
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

describe("POST /wishlist sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/wishlist")
      .send(wishlist)
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty(
          "msg",
          "WishlistItem has been succesfully created"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe("POST /wishlist gagal tidak membawa access token", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/wishlist")
      .send(wishlist)
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

describe("POST /wishlist gagal, nama tidak diisi", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/wishlist")
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

describe("GET /wishlist/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/wishlist/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("UserId", expect.any(Number));
        expect(body).toHaveProperty("name", expect.any(String));
        expect(body).toHaveProperty("image", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("tag", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /wishlist/:id gagal, wishlist id tidak ditemukan", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/wishlist/177698")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "WishlistItem not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /wishlist/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .put("/wishlist/1")
      .send(editedWishlist)
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "WishlistItem has been successfully updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /wishlist/:id gagal, tidak membawa access token", () => {
  it("it responds with ", (done) => {
    request(app)
      .put("/wishlist/1")
      .send(editedWishlist)
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
describe("PUT /wishlist/:id gagal access token tidak sesuai userId", () => {
  it("it responds with ", (done) => {
    request(app)
      .put("/wishlist/1")
      .send(editedWishlist)
      .set({ access_token: token_user_2, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(
          "error",
          "You are not authorized to perform this action"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe("DELETE /wishlist/:id gagal tidak membawa access token", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/wishlist/1")
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

describe("DELETE /wishlist/:id gagal access token tidak sesuai userId", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/wishlist/1")
      .set({ access_token: token_user_2, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(
          "error",
          "You are not authorized to perform this action"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /wishlist/:id gagal wishlist tidak ditemukan", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/wishlist/463463")
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("error", "WishlistItem not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});



describe("DELETE /wishlist/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .delete("/wishlist/1")
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "msg",
          "Wishlist has been successfully deleted"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});