const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

let successCase = {
  username: "user",
  email: "user@mail.com",
  password: "12345678",
};

let dupeEmailCase = {
  username: "user32",
  email: "user@mail.com",
  password: "12345678",
};

let dupeUsernameCase = {
  username: "user",
  email: "user32@mail.com",
  password: "12345678",
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

let newDetail = {
  userImage: "new user img",
  location: "newlocation",
  userDesc: "new userDesc"
}

let access_token = generateToken({
  id: 1,
  username: "user",
  email: "user@mail.com",
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", null, { truncate: true, restartIdentity: true, cascade: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST register user sukses", () => {
  it("it responds with status 200 ,username ,email, id", (done) => {
    request(app)
      .post("/users/register")
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
      .post("/users/register")
      .send(dupeEmailCase)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("error", "Email is already used");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST register dgn format email salah", () => {
  it('it responds with msg "Incorrect email format"', (done) => {
    request(app)
      .post("/users/register")
      .send(wrongFormat)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body.error).toContain("Incorrect email format")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST register user dengan username yg sudah terdaftar", () => {
  it("it responds with status 400 'Username is already used", (done) => {
    request(app)
      .post("/users/register")
      .send(dupeUsernameCase)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("error", "Username is already used");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST register dgn password kurang dari 6 karakter", () => {
  it('it responds with error "Minimum password length is 6 characters"', (done) => {
    request(app)
      .post("/users/register")
      .send(badPassword)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body.error).toContain("Minimum password length is 6 characters")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST login user sukses", () => {
  it("it responds with status 200 ", (done) => {
    request(app)
      .post("/users/login")
      .send(successCase)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", successCase.email);
        expect(body).toHaveProperty("username", successCase.username);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST login user dgn password salah", () => {
  it('it responds with status 401 and message :"Incorrect email or password"', (done) => {
    request(app)
      .post("/users/login")
      .send(badPassword)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Incorrect email or password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST login user dgn email salah", () => {
  it('it responds with status 401 and message :"Incorrect email or password"', (done) => {
    request(app)
      .post("/users/login")
      .send(wrongFormat)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("error", "Incorrect email or password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /users/:id sukses", () => {
  it("it responds with msg User profile has been successfully updated", (done) => {
    request(app)
      .put("/users")
      .send(newDetail)
      .set({ access_token: access_token, Accept: "application/json" })
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "User profile has been successfully updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});