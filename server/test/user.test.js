const request = require("supertest");
// const { hashPassword } = require("../helpers/bcrypt");

const app = require("../app_test");
// const { sequelize } = require("../models");
// const { queryInterface } = sequelize;
let successCase = {
  username: "user",
  email: "user@mail.com",
  password: "123456",
};
let registered = {
  email: "registered@mail.com",
};

let wrongFormat = {
  username: "user",
  email: "usermail.com",
  password: "123456",
};

let badPassword = {
  username: "user",
  email: "user@mail.com",
  password: "1256",
};

describe("POST register user sukses", () => {
  it("it responds with status 200 ,username ,email, id", (done) => {
    request(app)
      .post("/register")
      .send(successCase)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(201);
        
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", successCase.email);
        expect(body).toHaveProperty("username", successCase.username);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("POST register user dengan email yg sudah terdaftar", () => {
  it("it responds with status 400 'Email is already used", (done) => {
    request(app)
      .post("/register")
      .send(registered)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        
        expect(body).toHaveProperty("message", "Email is already used");
        done();
      })
      .catch((err) => {
        // console.log(err)
        done(err);
      });
  });
});
describe("POST register dgn format email salah", () => {
  it('it responds with msg "Incorrect email format"', (done) => {
    request(app)
      .post("/register")
      .send(wrongFormat)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        // console.log(body)
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Incorrect email format");
        done();
      })
      .catch((err) => {
        // console.log(err)
        done(err);
      });
  });
});
describe("POST register dgn password kurang dari 6 karakter", () => {
  it('it responds with msg "Password length 6 character minimum"', (done) => {
    request(app)
      .post("/register")
      .send(badPassword)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        // console.log(body)
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "message",
          "Password length 6 character minimum"
        );
        done();
      })
      .catch((err) => {
        // console.log(err)
        done(err);
      });
  });
});
describe("POST login user sukses", () => {
  it("it responds with status 200 ,email, id, access_token", (done) => {
    request(app)
      .post("/login")
      .send(successCase)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", successCase.email);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      })
      .catch((err) => {
        // console.log(err)
        done(err);
      });
  });
});
describe("POST login customer dgn email/password salah", () => {
  it('it responds with status 401 and message :"Incorrect email or password"', (done) => {
    request(app)
      .post("/login")
      .send(wrongFormat)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        // console.log(body)
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Incorrect email or password");
        done();
      })
      .catch((err) => {
        // console.log(err)
        done(err);
      });
  });
});












// beforeAll((done) => {
//     queryInterface
//       .bulkInsert("Users", [
//         {
//           email: "admin@mail.com",
//           password: hashPassword("123456"),
//           isAdmin: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ])
//       .then(() => {
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   afterAll((done) => {
//     queryInterface
//       .bulkDelete("Users")
//       .then(() => {
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
