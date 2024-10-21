import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const uploadFileToGoogleCloud = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const fileName = `${uuidv4()}-${file.name}`; // Optionally, use a unique name
    await storage
      .bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET)
      .file(fileName)
      .save(Buffer.from(buffer));

    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${fileName}`;
    console.log("url image",publicUrl);
    return publicUrl; // Return the public URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to Google Cloud Storage:", error);
    return { error: "Error uploading file to Google Cloud Storage" };
  }
};
