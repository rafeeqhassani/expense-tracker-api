const request = require("supertest");
const app = require("../app");

describe("Authentication API", () => {
  test("POST /api/auth/login should return JWT token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@user.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.token).toBeDefined();

    expect(response.body.data.user.email).toBe("test@user.com");
  });
});

test("GET /api/auth/me should return current user", async () => {
  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "test@user.com",
    password: "password123",
  });

  const token = loginResponse.body.data.token;

  const response = await request(app)
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);

  expect(response.body.user.email).toBe("test@user.com");
});

test("login should fail with wrong password", async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "test@user.com",
    password: "password124",
  });

  expect(response.statusCode).toBe(401);
});
