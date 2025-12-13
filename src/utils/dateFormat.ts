
export type DateInputType =
  | "datetime-local"
  | "date"
  | "time"
  | "iso";

export function formatDateByInputType(
  value?: string | Date | null,
  type: DateInputType = "datetime-local"
): string {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());

  switch (type) {
    case "datetime-local":
      return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;

    case "date":
      return `${yyyy}-${MM}-${dd}`;

    case "time":
      return `${HH}:${mm}`;

    case "iso":
      return date.toISOString();

    default:
      return "";
  }
}
