import { TimeSpan, TimeUnit } from "../types/common";

const UNIT_CONVERSIONS = new Map<TimeUnit, number>([
  ["ms", 1],
  ["s", 1000],
  ["m", 1000 * 60],
  ["h", 1000 * 60 * 60],
  ["d", 1000 * 60 * 60 * 24],
]);

export default function parseTimeSpanToMilliseconds(timeSpan: TimeSpan) {
  const regex = /(\d+)\s?([dhms]+)?/i;
  const matches = timeSpan.match(regex);

  if (!matches) {
    throw new Error("Неправильний часовий проміжок");
  }

  const timeUnit = (matches[2] ?? "ms").toLowerCase() as TimeUnit;
  const millisecondsInTimeUnit = UNIT_CONVERSIONS.get(timeUnit);

  if (millisecondsInTimeUnit === undefined) {
    throw new Error("Недопустима часова одиниця");
  }

  const unitValue = parseInt(matches[1]);
  return unitValue * millisecondsInTimeUnit;
}
