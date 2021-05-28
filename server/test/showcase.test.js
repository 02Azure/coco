const request = require("supertest");
const app = require("../app");

describe("GET /showcases sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcases")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "success showcase getAll");
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
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        console.log(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("msg","success showcase create");
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
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("msg", "success showcase create");
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
        expect(body).toHaveProperty("msg", "success showcase showOne");
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
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "msg",
          "success showcase editName"
        );
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
          expect(body).toHaveProperty(
            "msg",
            "success showcase delete"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });