const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Path to your Firebase service account key file
const serviceAccount = require("./somaticzapp-firebase-adminsdk-lae1z-d8cee49e47.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const importJSONToFirestore = async () => {
  try {
    // Path to your JSON file
    const filePath = path.join(__dirname, "./workouts.json");

    // Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Reference to the Firestore collection
    const collectionRef = db.collection("exercises"); // Change collection name as needed

    // Batch write to Firestore
    const batch = db.batch();

    data.forEach((item) => {
      const docRef = collectionRef.doc(); // Automatically generate a new document ID
      batch.set(docRef, item);
    });

    await batch.commit();
    console.log("JSON data successfully imported into Firestore!");
  } catch (error) {
    console.error("Error importing JSON data:", error);
  }
};

importJSONToFirestore();
