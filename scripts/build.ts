import { logger } from "./utils";

async function main() {
  logger.withBothLn(() => logger.successText("start building lib..."));
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
