import app from "./src/app.js";
import chalk from "chalk";
import connectDB from "./src/configs/databaseConfig.js";

const PORT = process.env.PORT || 3000;
await connectDB()

app.listen(PORT, () => {
  console.log(chalk.bgBlue(`Server is live on http://localhost:${PORT}`));
});
