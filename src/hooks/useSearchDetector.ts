export type SearchResult =
  | { type: "code"; value: string }
  | { type: "slug"; value: string }
  | { type: "title"; value: string };

export function useSearchDetector() {
  const detectType = (value: string): SearchResult => {
    const trimmed = value.trim();

    // số → id
    if (/^\d+$/.test(trimmed)) {
      return { type: "code", value: trimmed };
    }

    // slug
    if (/^[a-z0-9-]+$/.test(trimmed.toLowerCase())) {
      return { type: "slug", value: trimmed.toLowerCase() };
    }

    // còn lại → title
    return { type: "title", value: trimmed };
  };

  return { detectType };
}
