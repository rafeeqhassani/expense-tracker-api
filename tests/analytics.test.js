const request = require("supertest");
const app = require("../app");

describe("Analytics API", () => {
  test("GET /api/analytics should require authentication", async () => {
    const response = await request(app).get("/api/analytics/summary");

    expect(response.statusCode).toBe(401);
  });
});
