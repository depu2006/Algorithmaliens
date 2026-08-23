#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import { initDb, query } from '../db/db.js';
import { syncAllToFirestore } from '../db/firebaseAdmin.js';

async function main() {
  try {
    console.log('[Sync Script] Initializing SQLite connection...');
    await initDb();
    
    console.log('[Sync Script] Triggering full sync of SQLite database tables to Firebase Firestore...');
    await syncAllToFirestore(query);

    console.log('[Sync Script] Synchronization process complete.');
    process.exit(0);
  } catch (err) {
    console.error('[Sync Script Error] Failed to complete sync:', err);
    process.exit(1);
  }
}

main();
