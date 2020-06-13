import chalk from "chalk";
import { createLogger as winston, format, transports } from "winston";

const { printf, combine, label, timestamp, colorize, simple } = format;

const fmt = printf(({ level, message, label, timestamp }) => {
  return `${chalk.gray(timestamp)} ${label.toLowerCase()}:${level} ${chalk.gray(
    "→"
  )} ${message}`;
});

/**
 * Create a logger with the specified prefix.
 * @param name
 */
export const createLogger = (name: string) =>
  winston({
    transports: [new transports.Console()],
    format: combine(
      label({ label: name }),
      timestamp(),
      colorize(),
      simple(),
      fmt
    ),
  });
