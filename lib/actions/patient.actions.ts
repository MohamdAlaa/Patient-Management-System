"use server";
import { ID, Query } from "node-appwrite";

import {
  API_KEY,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Validate required environment variables
    if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
      throw new Error("Missing required Appwrite environment variables");
    }

    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      name: user.name,
    });

    console.log("Created user object:", newuser);
    console.log("User object keys:", Object.keys(newuser));
    console.log("User ID property:", newuser.$id);

    const parsedUser = parseStringify(newuser);
    console.log("Parsed user object:", parsedUser);

    return parsedUser;
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      try {
        const existingUser = await users.list({
          queries: [Query.equal("email", [user.email])],
        });

        console.log("Existing user object:", existingUser.users[0]);
        console.log("Existing user keys:", Object.keys(existingUser.users[0]));
        console.log("Existing user ID property:", existingUser.users[0].$id);

        const parsedExistingUser = parseStringify(existingUser.users[0]);
        console.log("Parsed existing user object:", parsedExistingUser);

        return parsedExistingUser;
      } catch (listError) {
        console.error("Error fetching existing user:", listError);
        throw new Error("Failed to create or retrieve user");
      }
    }
    console.error("An error occurred while creating a new user:", {
      error: error.message || error,
      code: error.code,
      type: error.type,
      userEmail: user.email,
      timestamp: new Date().toISOString(),
    });
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId });

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile({
        bucketId: BUCKET_ID!,
        fileId: ID.unique(),
        file: inputFile,
      });
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    // Check if patient exists
    if (patients.documents.length === 0) {
      console.log(`No patient found for userId: ${userId}`);
      return null;
    }

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    return null;
  }
};
