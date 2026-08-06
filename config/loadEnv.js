const path = require("path");
const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env";

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});
