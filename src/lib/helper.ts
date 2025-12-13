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


export const formatDateTimeLocal = (value?: string | null): string => {
  if (!value) return "";

  // Nếu đã đúng format 'YYYY-MM-DDTHH:mm' thì trả luôn
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    return value;
  }

  // Còn lại coi như ISO → convert về local dạng datetime-local
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);

  return local.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
};

export const toIsoString = (value?: string | null): string | null => {
  if (!value) return null;
  const d = new Date(value); // value đang là 'YYYY-MM-DDTHH:mm'
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString(); // '2025-12-05T10:30:00.000Z'
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



export function smoothNavigate(
  navigate: (to: string) => void,
  to: string
) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => navigate(to), 150);
}