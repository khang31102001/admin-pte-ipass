import { AlertCircle } from "lucide-react";

type ErrorRecord = Record<string, string | undefined>;

interface FormErrorSummaryProps {
  errors?: ErrorRecord;
  title?: string;
  className?: string;
}

export default function FormErrorSummary({
  errors,
  title = "Vui lòng kiểm tra lại các trường bị lỗi bên dưới.",
  className,
}: FormErrorSummaryProps) {
  if (!errors) return null;

  // Lọc ra những field có message lỗi
  const entries = Object.entries(errors).filter(
    ([ , message]) => Boolean(message)
  );

  if (entries.length === 0) return null;

  return (
    <div
      className={
        "mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 " +
        (className ?? "")
      }
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-medium">{title}</p>
          <ul className="mt-1 list-disc pl-5 space-y-0.5">
            {entries.map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
