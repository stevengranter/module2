enum logType {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

enum levelColors {
  "INFO" = "green",
  "WARNING" = "orange",
  "ERROR" = "red",
  "CRITICAL" = "magenta",
}

export function log(
  message: string | object,
  level: logType = logType.INFO,
): void {
  if (process.env.NODE_ENV !== "production") {
    if (!message) console.log("No message for log");
    if (typeof message !== "string") message = JSON.stringify(message);
    console.log(`%c${message}`, `color: ${levelColors[level]}`);
  }
}
