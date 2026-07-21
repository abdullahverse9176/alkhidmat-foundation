import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using environment variables.
// In your .env.local, make sure you define:
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key
// CLOUDINARY_API_SECRET=your_api_secret

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

/**
 * Helper to upload image data (e.g. base64 string, local file path) directly to Cloudinary.
 * @param fileUri base64 data URI (e.g., data:image/png;base64,...) or file path
 * @param folder folder name in Cloudinary (defaults to 'services')
 */
export async function uploadToCloudinary(
  fileUri: string,
  folder: string = "services"
): Promise<CloudinaryUploadResponse> {
  // Always configure at call-time to ensure environment variables are loaded
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // If Cloudinary keys are not set, return a mock or throw error
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    console.warn("Cloudinary environment variables are missing! Using mock upload result.");
    return {
      secure_url: fileUri.startsWith("data:") ? "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=800" : fileUri,
      public_id: "mock_public_id",
    };
  }

  return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUri,
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve({
          secure_url: result!.secure_url,
          public_id: result!.public_id,
        });
      }
    );
  });
}
