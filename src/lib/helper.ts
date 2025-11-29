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