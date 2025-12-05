export const getBaseUrl = () =>{
    const url = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173/";
    return url.endsWith("/") ? url : url + "/";
}

 export const generateSlug = (value: string): string => {
  return  value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
 }

export const formatDate = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const countWords = (text: string): number => {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
};

export const isEmpty = (value: unknown) => value === null || value === undefined || String(value).trim() === "";

export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
