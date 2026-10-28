import chalk from "chalk";

function logError(err, where) {
  if (process.env.NODE_ENV !== "development") return;

  console.error(chalk.bgRedBright.white.bold(" ERROR "));
  console.error(chalk.magenta(`Location: ${where}`));
  console.error(err);
}

export default logError;
