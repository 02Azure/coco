const request = require("supertest")
const app = require("../app")
const { sequelize, User, Item } = require("../models")
const { queryInterface } = sequelize
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const hashPassword = require("../helpers/hashPassword")

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET)
}

let access_token
let token_user_2
let user = {
    username: 'siotong',
    password: hashPassword('abc123'),
    email: 'otong@mail.com',
    userDesc: 'Hanyalah seorang pemuda yang mengoleksi kertas karton yugioh',
    location: 'Stardew Valley',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  let user2 = {
    username: 'lilynano',
    password: hashPassword('lalalili'),
    email: 'lilynano@mail.com',
    userDesc: 'new Co&Co passionate collector', //default value?
    location: 'Zuzu City',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  let item = {
    UserId: 1,
    name: 'Exodia the Forbidden One UR LOB',
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg',
    tradeable: false,
    price: 700000,
    tradeWith: '',
    tag: 'Yugioh-TCG',
    description: 'Unlimited Edition, Near Mint Condition, masih wangy!',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const newItem = {
    UserId: 1,
    name: 'Exodia the Forbidden One UR LOB',
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg',
    tradeable: false,
    price: 700000,
    tradeWith: '',
    tag: 'Yugioh-TCG',
    description: 'Unlimited Edition, Near Mint Condition, masih wangy!'
  }

  const updateItem = {
    name: 'Right Leg of the Forbidden One UR LOB',
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155848.jpg',
    tradeable: true,
    price: 300000,
    tradeWith: 'Playmat Yugioh San Diego Comic-Con Exclusive Yugi & Exodia Playmat',
    tag: 'Yugioh-TCG',
    description: 'Unli, NM',
  }

  const emptyNameItem = {
    UserId: 1,
    name: '',
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg',
    tradeable: false,
    price: 700000,
    tradeWith: '',
    tag: 'Yugioh-TCG',
    description: 'Unlimited Edition, Near Mint Condition, masih wangy!'
  }
 


  beforeAll((done) => {
      User.create(user)
        .then((result) => {
            access_token = generateToken({
                username: result.username,
                id: result.id
            })
            return User.create(user2)
        }) 
        .then((result) => {
            token_user_2 = generateToken({
                username: result.username,
                id: result.id
            })
            return Item.create(item)
        }) 
        .then(() => {
            done()
        })
        .catch((err) => {
            done(err)
        })
  })

  afterAll((done) => {
      queryInterface.bulkDelete("Users", null, { truncate: true, restartIdentity:true, cascade:true })
      .then(() => {
          queryInterface.bulkDelete("Items", null, { truncate: true, restartIdentity: true, cascade: true })
      })
      .then(() => {
          done()
      })
      .catch((err) => {
          done(err)
      })
  })

  describe("GET /items success", () => {
      it("it responds with", (done) => {
          request(app)
            .get("/items")
            .set({access_token: access_token,"Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                let { body, status } = response
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBeTruthy()
                done()
            })
            .catch((err) => {
                done(err)
            })
      })
  })

  describe("GET /items gagal, tidak ada access_token", () => {
      it("it responds with ", (done) => {
          request(app)
            .get("/items")
            // .set({ access_token: access_token, "Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                // console.log(access_token)?
                expect(status).toBe(401)
                expect(body).toHaveProperty("error", "Invalid access token")
                done()
            })
            .catch(err => {
                done(err)
            })
      })
  })

  describe("POST /showcases sukses", () => {
    it("it responds with ", (done) => {
      request(app)
        .post("/items")
        .send(newItem)
        .set({access_token: access_token,"Accept": "application/json"})
        .expect("Content-Type", /json/)
        .then((response) => {
          let { body, status } = response;
        //   console.log(body, "post<<<<<<<<<<");
          expect(status).toBe(201);
          expect(body).toHaveProperty("msg", "Item has been successfully created");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST /items gagal tidak membawa access token", () => {
      it("it responds with", (done) => {
          request(app)
            .post("/items")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty("error", "Invalid access token")
                done()
            })
            .catch(err => {
                done(err)
            })
      })
  })

  describe("POST /items gagal, nama tidak diisi", () => {
    it("it responds with ", (done) => {
      request(app)
        .post("/items")
        .send(emptyNameItem)
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

  describe("GET /items/:id sukses", () => {
      it("it responds with", (done) => {
          request(app)
            .get("/items/1")
            .set("Accept", "application/json")
            .set({access_token: access_token,"Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                // console.log(body.item)
                expect(status).toBe(200)
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("UserId", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("image", expect.any(String))
                expect(body).toHaveProperty("tradeable", expect.any(Boolean))
                expect(body).toHaveProperty("price", expect.any(Number))
                expect(body).toHaveProperty("tradeWith", expect.any(String))
                expect(body).toHaveProperty("tag", expect.any(String))
                expect(body).toHaveProperty("description", expect.any(String))
                done()
            })
            .catch(err => {
                done(err)
            })
      })
  })

  describe("GET /items/:id gagal, items id tidak ditemukan", () => {
      it("it responds with", (done) => {
          request(app)
            .get("/items/13232")
            .set("Accept", "application/json")
            .set({access_token: access_token,"Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("error", "Item is not found!")
                done()
            })
            .catch(err => {
                done(err)
            })
      })
  })

  describe("PUT /items/:id sukses", () => {
      it("it responds with", (done) => {
          request(app)
            .put("/items/1")
            .send(updateItem)
            .set({access_token: access_token,"Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                // console.log(body,"test <<<<<<<<<<")
                expect(status).toBe(200)
                expect(body).toHaveProperty("msg", "Item has been successfully updated")
                done()
            })
            .catch(err => {
                done(err)
            })

      })
  })

  describe("PUT /items/:id gagal item tidak ditemukan", () => {
    it("it responds with", (done) => {
        request(app)
          .put("/items/322")
          .send(updateItem)
          .set({access_token: access_token,"Accept": "application/json"})
          .expect("Content-Type", /json/)
          .then((response) => {
              const { body, status } = response
              // console.log(body,"test <<<<<<<<<<")
              expect(status).toBe(404)
              expect(body).toHaveProperty("error", "Item not found")
              done()
          })
          .catch(err => {
              done(err)
          })

    })
})

  describe("PUT /items/:id gagal tidak membawa access token", () => {
    it("it responds with", (done) => {
        request(app)
          .put("/items/1")
          .send(updateItem)
          .set({"Accept": "application/json"})
          .expect("Content-Type", /json/)
          .then((response) => {
              const { body, status } = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("error", "Invalid access token")
              done()
          })
          .catch(err => {
              done(err)
          })

    })
})

describe("PUT /items/:id gagal access token tidak sesuai userId", () => {
    it("it responds with ", (done) => {
      request(app)
        .put("/items/1")
        .send(updateItem)
        .set({access_token:token_user_2,"Accept": "application/json"})
        .expect("Content-Type", /json/)
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("error", "You are not authorized to perform this action");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PUT /items/:id gagal nama tidak diisi", () => {
    it("it responds with ", (done) => {
      request(app)
        .put("/items/1")
        .send(emptyNameItem)
        .set({access_token:access_token, Accept: "application/json" })
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

  describe("PATCH /items/:id sukses", () => {
    it("it responds with", (done) => {
        request(app)
          .patch("/items/1")
          .send({
              tradeable: true
          })
          .set({access_token: access_token,"Accept": "application/json"})
          .expect("Content-Type", /json/)
          .then((response) => {
              const { body, status } = response
              // console.log(body,"test <<<<<<<<<<")
              expect(status).toBe(200)
              expect(body).toHaveProperty("msg", "Item tradeable has been successfully updated")
              done()
          })
          .catch(err => {
              done(err)
          })

    })
})

describe("PATCH /items/:id gagal tidak membawa access token", () => {
    it("it responds with", (done) => {
        request(app)
          .patch("/items/1")
          .send({
              tradeable: true
          })
          .expect("Content-Type", /json/)
          .then((response) => {
              const { body, status } = response
              // console.log(body,"test <<<<<<<<<<")
              expect(status).toBe(401)
              expect(body).toHaveProperty("error", "Invalid access token");
              done()
          })
          .catch(err => {
              done(err)
          })

    })
})

describe("PATCH /items/:id sukses", () => {
    it("it responds with", (done) => {
        request(app)
          .patch("/items/1")
          .send({
              tradeable: true
          })
          .set({access_token: token_user_2,"Accept": "application/json"})
          .expect("Content-Type", /json/)
          .then((response) => {
              const { body, status } = response
              // console.log(body,"test <<<<<<<<<<")
              expect(status).toBe(401)
              expect(body).toHaveProperty("error", "You are not authorized to perform this action")
              done()
          })
          .catch(err => {
              done(err)
          })

    })
})

describe("DELETE /items/:id gagal access token tidak sesuai dengan userId", () => {
    it("it responds with", (done) => {
        request(app)
            .delete("/items/1")
            .set({ access_token: token_user_2, "Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty("error", "You are not authorized to perform this action")
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
})

describe("DELETE /items/:id gagal tidak membawa access token", () => {
    it("it responds with ", (done) => {
        request(app)
            .delete("/items/1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty("error", "Invalid access token")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("DELETE /items/:id sukses", () => {
    it("it responds with ", (done) => {
        request(app)
            .delete("/items/1")
            .set({ access_token: access_token, "Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("msg", "Item has been successfully deleted")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("DELETE /items/:id gagal items tidak ditemukan", () => {
    it("it responds with ", (done) => {
        request(app)
            .delete("/items/1")
            .set({access_token: access_token, "Accept": "application/json"})
            .expect("Content-Type", /json/)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty("error", "Item not found")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})
