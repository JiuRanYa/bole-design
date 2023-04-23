import { logger, run } from "./utils";
import minimist from "minimist";

const args = minimist<{
  d?: boolean;
  dev?: boolean;
}>(process.argv.slice(2));

const devOnly = args.dev || args.d;

const env = devOnly ? "development" : "production";

async function main() {
  logger.withBothLn(() => logger.successText("start building lib..."));

  await run("pnpm", ["bootstrap"]);
  await run("vite", ["build", "--config", "vite.config.ts"], {
    env: {
      NODE_ENV: env,
    },
  });

  logger.ln();

  if (!process.exitCode) {
    logger.withEndLn(() => logger.success("all builds completed successfully"));
  }
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
