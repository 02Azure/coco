const request = require("supertest");
const app = require("../app");
const { sequelize, User, Showcase, Item } = require("../models");
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
let showcase1 = {
  UserId: 1,
  name: "Si atk tak terhingga",
  isStarred: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let showcase2 = {
  UserId: 1,
  name: "item 1",
  isStarred: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

let item1 = {
  UserId: 1,
  name: "item 1",
  image: "imgur.com",
  tradeable: false,
  price: 500000000,
  tradeWith: "string",
  tag: "tag",
  description: "deskripsi item1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

let item2 = {
  UserId: 1,
  name: "item 2",
  image: "imgur.com",
  tradeable: false,
  price: 200000000,
  tradeWith: "string",
  tag: "tag",
  description: "deskripsi item 3",
  createdAt: new Date(),
  updatedAt: new Date(),
};
let item3 = {
  UserId: 1,
  name: "item 3",
  image: "imgur.com",
  tradeable: false,
  price: 200000000,
  tradeWith: "string",
  tag: "tag",
  description: "deskripsi item 3",
  createdAt: new Date(),
  updatedAt: new Date(),
};
let item4 = {
  UserId: 1,
  name: "item 4",
  image: "imgur.com",
  tradeable: false,
  price: 200000000,
  tradeWith: "string",
  tag: "tag",
  description: "deskripsi item4",
  createdAt: new Date(),
  updatedAt: new Date(),
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
      return Showcase.create(showcase1);
    })
    .then(() => {
      return Showcase.create(showcase2);
    })
    .then(() => {
      return Item.create(item1);
    })
    .then(() => {
      return Item.create(item2);
    })
    .then(() => {
      return Item.create(item3);
    })
    .then(() => {
      return Item.create(item4);
    })
    .then(() => {
      return ShowcaseItem.create({ ShowcaseId: 1, ItemId: 1 });
    })
    .then(() => {
      return ShowcaseItem.create({ ShowcaseId: 1, ItemId: 2 });
    })
    .then(() => {
      return Item.create(item4);
    })
    .then(() => {
      done();
    })

    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
    .then(() => {
      queryInterface.bulkDelete("Showcases", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });
    })
    .then(() => {
      queryInterface.bulkDelete("Items", null, {
        truncate: true,
        restartIdentity: true,
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

describe("POST /showcaseitem sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/showcaseitem")
      .send({ ShowcaseId: 1, ItemId: 3 })
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty(
          "msg",
          "ShowcaseItem has been succesfully created"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
