#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const adminModule = await import('firebase-admin');
const admin = adminModule.default || adminModule;
import { query } from '../db/db.js';

// Usage: node server/scripts/migrate-to-firestore.js /path/to/serviceAccount.json
// Or set env var FIREBASE_SERVICE_ACCOUNT to the service account JSON path.

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || process.argv[2];

function initFirebase() {
  if (serviceAccountPath) {
    console.log('[migrate] admin keys:', Object.keys(admin || {}));
    const resolved = path.isAbsolute(serviceAccountPath)
      ? serviceAccountPath
      : path.join(process.cwd(), serviceAccountPath);
    if (!fs.existsSync(resolved)) {
      console.error('[migrate] Service account file not found:', resolved);
      process.exit(1);
    }
    const key = JSON.parse(fs.readFileSync(resolved, 'utf8'));
    admin.initializeApp({ credential: admin.cert(key) });
    console.log('[migrate] Firebase Admin initialized with service account.');
  } else {
    try {
      admin.initializeApp();
      console.log('[migrate] Firebase Admin initialized with Application Default Credentials.');
    } catch (err) {
      console.error('[migrate] No Firebase credentials available. Provide a service account JSON path as the first arg or set FIREBASE_SERVICE_ACCOUNT.');
      process.exit(1);
    }
  }
}

async function migrateContacts() {
  const firestoreModule = await import('firebase-admin/firestore');
  const { getFirestore, Timestamp, FieldValue } = firestoreModule;
  const firestore = getFirestore(admin.getApp());
  const rows = await query.all('SELECT * FROM contacts ORDER BY createdAt DESC');
  console.log(`[migrate] Found ${rows.length} contacts in SQLite`);

  if (rows.length === 0) return;

  let batch = firestore.batch();
  let processed = 0;

  for (const r of rows) {
    const docRef = firestore.collection('contacts').doc(String(r.id));
    const createdAt = r.createdAt ? Timestamp.fromDate(new Date(r.createdAt)) : FieldValue.serverTimestamp();
    const doc = {
      name: r.name,
      email: r.email,
      phone: r.phone || '',
      subject: r.subject || '',
      company: r.company || null,
      service: r.service || null,
      projectDescription: r.projectDescription || null,
      message: r.message || '',
      type: r.type || 'contact',
      status: r.status || 'new',
      createdAt
    };
    batch.set(docRef, doc, { merge: true });
    processed++;

    if (processed % 500 === 0) {
      await batch.commit();
      batch = firestore.batch();
      console.log(`[migrate] Committed ${processed} contacts so far`);
    }
  }

  // commit remainder
  await batch.commit();
  console.log(`[migrate] Migration complete — ${processed} contacts migrated to Firestore collection 'contacts'.`);
}

async function main() {
  initFirebase();
  try {
    await migrateContacts();
    process.exit(0);
  } catch (err) {
    console.error('[migrate] Error migrating contacts:', err);
    process.exit(1);
  }
}

main();
