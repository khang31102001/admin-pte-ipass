export interface OptimizedImageResult {
  file: File;               // file tối ưu để upload
  previewUrl: string;       // chỉ dùng để xem trước, không lưu
  width: number;
  height: number;
  originalSize: number;
  optimizedSize: number;
}

interface ProcessImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 - 1
}

export async function processImageForWeb(
  file: File,
  options: ProcessImageOptions = {}
): Promise<OptimizedImageResult> {
  const {
    maxWidth = 1200,
    maxHeight = 675,
    quality = 0.8,
  } = options;

  // 1. create ObjectURL
  const originalUrl = URL.createObjectURL(file);

  // 2. load image
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = originalUrl;
  });

  const originalWidth = img.width;
  const originalHeight = img.height;

  // 3. resize, giữ tỉ lệ
  let targetWidth = originalWidth;
  let targetHeight = originalHeight;

  if (originalWidth > maxWidth || originalHeight > maxHeight) {
    const widthRatio = maxWidth / originalWidth;
    const heightRatio = maxHeight / originalHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    targetWidth = Math.round(originalWidth * ratio);
    targetHeight = Math.round(originalHeight * ratio);
  }

  // 4. vẽ lên canvas
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas init failed");

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // ✨ convert sang WebP nhưng `blob`, không base64
  const blob: Blob = await new Promise(resolve =>
    canvas.toBlob(resolve, "image/webp", quality)
  );

  // 5. convert blob → file
  const optimizedFile = new File([blob], "optimized.webp", {
    type: "image/webp",
  });

  return {
    file: optimizedFile,
    previewUrl: URL.createObjectURL(optimizedFile), // chỉ dùng cho UI
    width: targetWidth,
    height: targetHeight,
    originalSize: file.size,
    optimizedSize: optimizedFile.size,
  };
}
