/**
 * Utility to convert an image file to WebP format client-side using HTML5 Canvas.
 * Falls back to the original file if the browser doesn't support WebP or if the file is not an image.
 */
export function convertToWebP(file: File): Promise<File> {
  return new Promise((resolve) => {
    // If the file is not an image, return it immediately
    if (!file.type.startsWith("image/")) {
      return resolve(file);
    }

    // SVG and GIF formats can have animations/vector data we don't want to rasterize/lose,
    // so we skip converting them to static WebP.
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            console.warn("Could not get 2D canvas context for WebP conversion. Using original file.");
            return resolve(file);
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                console.warn("Canvas toBlob failed. Using original file.");
                return resolve(file);
              }
              const originalName = file.name;
              const lastDotIndex = originalName.lastIndexOf(".");
              const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
              const webpFile = new File([blob], `${baseName}.webp`, {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(webpFile);
            },
            "image/webp",
            0.85 // quality: 85% is a good balance between size and quality
          );
        } catch (e) {
          console.error("Error during WebP canvas rendering. Using original file:", e);
          resolve(file);
        }
      };
      img.onerror = () => {
        console.warn("Failed to load image for WebP conversion. Using original file.");
        resolve(file);
      };
    };
    reader.onerror = () => {
      console.warn("Failed to read file for WebP conversion. Using original file.");
      resolve(file);
    };
  });
}
