const request = require("supertest");
const app = require("../app");

describe("GET /showcase sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcase")
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

describe("POST /showcase sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/showcase")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        console.log(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("msg","success wishlist create");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /showcase sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .post("/showcase")
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

describe("GET /showcase/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/showcase/1")
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


describe("PATCH /showcase/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/showcase/1")
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


describe("DELETE /showcase/:id sukses", () => {
    it("it responds with ", (done) => {
      request(app)
        .delete("/showcase/1")
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