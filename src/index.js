import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
}
)

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error: ${error}`);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection error", error);
  });