const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "test@user.com",
    password: "password123",
  });

  token = loginResponse.body.data.token;
});

describe("Expenses API", () => {
  test("GET /api/expenses should reject without token", async () => {
    const response = await request(app).get("/api/expenses");

    expect(response.statusCode).toBe(401);
  });

  test("POST /api/expenses should create expense", async () => {
    const response = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Jest Test Expense",
        amount: 1000,
        category: "Food",
        date: "2026-08-04",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Jest Test Expense");
    expect(response.body.data.amount).toBe(1000);
  });

  test("GET /api/expenses should return user expenses", async () => {
    const response = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.expenses)).toBe(true);
    expect(response.body.data.pagination).toBeDefined();
  });

  test("POST /api/expenses should reject invalid data", async () => {
    const response = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        amount: -100,
        category: "",
        date: "",
      });

    expect(response.statusCode).toBe(400);
  });

  test("PUT /api/expenses should reject invalid update data", async () => {
    const createResponse = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Expense",
        amount: 100,
        category: "Food",
        date: "2026-08-06",
      });

    const expenseId = createResponse.body.data.id;

    const response = await request(app)
      .put(`/api/expenses/${expenseId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        amount: -100,
        category: "",
        date: "",
      });

    expect(response.statusCode).toBe(400);
  });
});
