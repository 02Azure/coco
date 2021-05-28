const request = require("supertest");
const app = require("../app");

describe("GET /wishlist sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .get("/wishlist")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "success wishlist getAll");
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
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("msg", "success wishlist create");
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
        expect(body).toHaveProperty("msg", "success wishlist showOne");
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
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", "success wishlist editName");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /wishlist/:id sukses", () => {
  it("it responds with ", (done) => {
    request(app)
      .patch("/wishlist/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "msg",
          "success wishlist switchStarredStatus"
        );
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
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty(
            "msg",
            "success wishlist delete"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });