const request = require("supertest");
const app = require("../app");

describe("Analytics API", () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@user.com",
      password: "password123",
    });

    token = response.body.data.token;
  });

  test("GET /api/analytics should require authentication", async () => {
    const response = await request(app).get("/api/analytics/summary");

    expect(response.statusCode).toBe(401);
  });
});
