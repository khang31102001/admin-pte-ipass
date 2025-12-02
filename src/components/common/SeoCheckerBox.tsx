
import { evaluateSeo } from "@/lib/seo";
import { SEODataInput } from "@/types/seo";

type SeoCheckerBoxProps = {
  data: SEODataInput; 
  title?: string; 
};

export const SeoCheckerBox: React.FC<SeoCheckerBoxProps> = ({ data, title = "SEO Score" }) => {
  const { score, level, messages } = evaluateSeo(data);

  const colorClass =
    level === "good"
      ? "bg-green-100 text-green-700 border-green-300"
      : level === "ok"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className={`rounded-xl border p-4 ${colorClass}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="inline-flex h-7 min-w-[2.25rem] items-center justify-center rounded-full bg-white/80 px-2 text-xs font-semibold">
          {score}/100
        </span>
      </div>

      <ul className="space-y-1 text-xs">
        {messages.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
