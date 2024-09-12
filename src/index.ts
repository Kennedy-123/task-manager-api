import connection from "../src/db/dbConnection";
import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connection();
  console.log(`server is running on port ${PORT}`);
});
