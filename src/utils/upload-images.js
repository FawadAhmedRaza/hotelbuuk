"use server";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";


const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_SERVICE_KEY, "base64").toString()
);
const storage = new Storage({
  credentials: {
    client_email: credential.client_email,
    private_key:  credential.private_key, // replace \\n with actual newlines
  },
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});


export const uploadFileToGoogleCloud = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const fileName = `${uuidv4()}-${file.name}`; // Create a unique filename
    const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;
    const bucket = storage.bucket(bucketName);
    const fileRef = bucket.file(fileName);

    // Upload the file
    await fileRef.save(Buffer.from(buffer));

    // Return file reference (to save in DB)
    return fileName; // Return fileName instead of signed URL
  } catch (error) {
    console.error("Error uploading file to Google Cloud Storage:", error);
    return { error: "Error uploading file to Google Cloud Storage" };
  }
};


export const generateSignedUrl = async (fileName) => {
  try {
    const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;
    const bucket = storage.bucket(bucketName);
    const fileRef = bucket.file(fileName);

    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000,
    };

    const [signedUrl] = await fileRef.getSignedUrl(options);
    return signedUrl;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return { error: "Error generating signed URL" };
  }
};
