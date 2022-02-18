const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDataBase = require("./startUp/initDataBase");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//   console.log(chalk.red(`production`));
// } else {
//   console.log(chalk.red(`development`));
// }

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });

    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`mongoDB connected`));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server listening on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
