import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import path from 'path';
import fs from 'fs';

let firestoreDb = null;
let isInitialized = false;

/**
 * Initializes Firebase Admin SDK using available environment variables or service account file.
 * Returns the Firestore database instance or null if credentials are not present.
 */
export function getFirestoreDb() {
  if (isInitialized) {
    return firestoreDb;
  }

  try {
    const existingApps = getApps();
    if (existingApps.length > 0) {
      firestoreDb = getFirestore(existingApps[0]);
      isInitialized = true;
      console.log('[Firebase Admin] Connected to active Firebase App instance.');
      return firestoreDb;
    }

    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const defaultKeyPath = path.join(process.cwd(), 'serviceAccountKey.json');

    const resolvedServiceAccountPath = serviceAccountPath
      ? (path.isAbsolute(serviceAccountPath) ? serviceAccountPath : path.join(process.cwd(), serviceAccountPath))
      : null;

    const hasServiceAccountFile = (resolvedServiceAccountPath && fs.existsSync(resolvedServiceAccountPath)) || fs.existsSync(defaultKeyPath);
    const hasServiceAccountJson = !!serviceAccountJson;

    if (!hasServiceAccountFile && !hasServiceAccountJson) {
      console.log('[Firebase Admin Notice] Server-side Cloud Firestore is waiting for credentials.');
      console.log('  👉 To enable automatic backend Firestore dual-writing: Download a Service Account Key (.json) from Firebase Console -> Project Settings -> Service Accounts and save it as "server/serviceAccountKey.json".');
      return null;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'algorithmaliens-90990';
    let app = null;

    if (hasServiceAccountJson) {
      try {
        const key = JSON.parse(serviceAccountJson);
        app = initializeApp({ credential: cert(key), projectId: key.project_id || projectId });
        firestoreDb = getFirestore(app);
        isInitialized = true;
        console.log('[Firebase Admin] Initialized Firestore via FIREBASE_SERVICE_ACCOUNT_JSON env.');
        return firestoreDb;
      } catch (err) {
        console.error('[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', err.message);
      }
    }

    const keyPathToUse = (resolvedServiceAccountPath && fs.existsSync(resolvedServiceAccountPath))
      ? resolvedServiceAccountPath
      : defaultKeyPath;

    if (fs.existsSync(keyPathToUse)) {
      try {
        const key = JSON.parse(fs.readFileSync(keyPathToUse, 'utf8'));
        app = initializeApp({ credential: cert(key), projectId: key.project_id || projectId });
        firestoreDb = getFirestore(app);
        isInitialized = true;
        console.log(`[Firebase Admin] Initialized Firestore via Service Account file: ${keyPathToUse}`);
        return firestoreDb;
      } catch (err) {
        console.error('[Firebase Admin] Error reading Service Account Key file:', err.message);
      }
    }
  } catch (globalErr) {
    console.warn('[Firebase Admin] Initialization attempt warning:', globalErr.message);
  }

  return firestoreDb;
}

/**
 * Save or update a document in a Firestore collection asynchronously.
 * Non-blocking: logs success or notice without breaking SQLite operations.
 */
export async function saveToFirestore(collectionName, docId, data) {
  try {
    const db = getFirestoreDb();
    if (!db) return;

    const idString = String(docId);
    const docRef = db.collection(collectionName).doc(idString);

    const cleanData = JSON.parse(JSON.stringify(data));

    await docRef.set(
      {
        ...cleanData,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    ).catch(err => {
      console.warn(`[Firebase Backend Write Notice] Could not write '${collectionName}/${docId}' to Cloud Firestore:`, err.message);
    });

    console.log(`[Firebase Dual-Write] Saved to collection '${collectionName}' with doc ID: ${idString}`);
  } catch (err) {
    console.warn(`[Firebase Dual-Write Notice] '${collectionName}' (ID: ${docId}):`, err.message);
  }
}

/**
 * Delete a document from a Firestore collection asynchronously.
 */
export async function deleteFromFirestore(collectionName, docId) {
  try {
    const db = getFirestoreDb();
    if (!db) return;

    const idString = String(docId);
    await db.collection(collectionName).doc(idString).delete().catch(err => {
      console.warn(`[Firebase Backend Delete Notice] Could not delete '${collectionName}/${docId}' from Cloud Firestore:`, err.message);
    });
    console.log(`[Firebase Dual-Write] Deleted doc ID '${idString}' from collection '${collectionName}'`);
  } catch (err) {
    console.warn(`[Firebase Dual-Write Notice] Delete failed for '${collectionName}' (ID: ${docId}):`, err.message);
  }
}

/**
 * Sync all SQLite tables to Firebase Firestore.
 */
export async function syncAllToFirestore(query) {
  try {
    const db = getFirestoreDb();
    if (!db) {
      console.log('[Firebase Sync] Skipping server sync pass — Service Account Key not loaded.');
      return;
    }

    console.log('[Firebase Sync] Starting full synchronization from SQLite to Firebase Firestore...');

    const tables = [
      'contacts',
      'services',
      'products',
      'projects',
      'events',
      'gallery',
      'testimonials',
      'faq',
      'team',
      'statistics',
      'internships',
      'settings'
    ];

    for (const table of tables) {
      try {
        const rows = await query.all(`SELECT * FROM ${table}`);
        if (!rows || rows.length === 0) continue;

        let batch = db.batch();
        let count = 0;

        for (const row of rows) {
          const docId = String(table === 'settings' ? row.key : row.id);
          const docRef = db.collection(table).doc(docId);
          const cleanRow = JSON.parse(JSON.stringify(row));
          batch.set(docRef, cleanRow, { merge: true });
          count++;

          if (count % 450 === 0) {
            await batch.commit().catch(() => {});
            batch = db.batch();
          }
        }
        await batch.commit().catch(batchErr => {
          console.warn(`[Firebase Sync Notice] Table '${table}' batch sync notice:`, batchErr.message);
        });
        console.log(`[Firebase Sync] Synced ${count} records from '${table}' to Firestore.`);
      } catch (tableErr) {
        console.warn(`[Firebase Sync Notice] Failed syncing table '${table}':`, tableErr.message);
      }
    }

    console.log('[Firebase Sync] Synchronization pass complete.');
  } catch (err) {
    console.warn('[Firebase Sync Notice] Global sync notice:', err.message);
  }
}
