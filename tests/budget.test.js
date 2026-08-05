const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "mrbhasni106@gmail.com",
    password: "2311853",
  });

  token = response.body.data.token;
});

describe("Budget API", () => {
  test("GET /api/budget should require authentication", async () => {
    const response = await request(app).get("/api/budget");

    expect(response.statusCode).toBe(401);
  });

  test("GET /api/budget should return user budget", async () => {
    const response = await request(app)
      .get("/api/budget")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
